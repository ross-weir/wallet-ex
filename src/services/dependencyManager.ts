import EventEmitter from 'events';
import { digestFile } from '../crypto';
import { DigestMismatchError, FileSystemError } from '../errors';
import { BackendServiceToken } from '../ioc';
import { BackendService } from './backend';
import Container from 'typedi';

export interface RemoteDependency {
  shortName: string;
  downloadUrl: string;
  localPath: string;
  digest?: string;
  metadataUrl?: string;
}

// Events: 'log'
export class DependencyManager extends EventEmitter {
  constructor(private readonly dependencies: RemoteDependency[]) {
    super();
  }

  public async ensureDependencies(): Promise<void> {
    await Promise.all(
      this.dependencies.map((dep) => this.ensureDependency(dep)),
    );
  }

  private async ensureDependency(dep: RemoteDependency): Promise<void> {
    try {
      this.log(`Validating ${dep.shortName}`);
      await this.validateDependency(dep);
    } catch (err) {
      // err is because of digest mismatch
      if (await this.backend.pathExists(dep.localPath)) {
        this.log(`Corrupted dependency: ${dep.shortName}, removing`);
        this.backend.removeFile(dep.localPath);
      }

      await this.downloadDependency(dep);
      await this.validateDependency(dep);
    }
  }

  private async downloadDependency(dep: RemoteDependency): Promise<void> {
    this.log(`Downloading ${dep.shortName}`);
    return this.backend.downloadFile(dep.downloadUrl, dep.localPath);
  }

  private async validateDependency({
    localPath,
    digest,
  }: RemoteDependency): Promise<void> {
    if (!(await this.backend.pathExists(localPath))) {
      throw new FileSystemError(`File does not exist ${localPath}`);
    }

    if (digest) {
      const actualDigest = await digestFile(localPath);

      if (actualDigest !== digest) {
        const name = await this.backend.getFilename(localPath);

        throw new DigestMismatchError(
          digest,
          actualDigest,
          `Digest mismatch for ${name}`,
        );
      }
    }
  }

  private log(msg: string): void {
    this.emit('log', msg);
  }

  private get backend(): BackendService {
    return Container.get(BackendServiceToken);
  }
}
