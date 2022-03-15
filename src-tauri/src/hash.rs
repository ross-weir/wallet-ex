//! Credits: https://github.com/baoyachi/sha256-rs

use sha2::Digest;
use std::{fs, io, path::Path};

pub fn digest<S: Into<String>>(input: S) -> String {
  __digest__(input.into().as_bytes())
}

/// sha256 digest bytes
///
/// # Examples
///
/// ```rust
/// use sha256::digest_bytes;
/// let input = b"hello";
/// let val = digest_bytes(input);
/// assert_eq!(val,"2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824")
/// ```
///
pub fn digest_bytes(input: &[u8]) -> String {
  __digest__(input)
}

/// sha256 digest file
///
/// # Examples
///
/// ```rust
/// use sha256::digest_file;
/// use std::path::Path;
/// let input = Path::new("./foo.file");
/// let val = digest_file(input).unwrap();
/// assert_eq!(val,"433855b7d2b96c23a6f60e70c655eb4305e8806b682a9596a200642f947259b1")
/// ```
///
pub fn digest_file<P: AsRef<Path>>(path: P) -> Result<String, io::Error> {
  let bytes = fs::read(path)?;
  Ok(__digest__(&bytes))
}

fn __digest__(data: &[u8]) -> String {
  hex::encode(sha2::Sha256::digest(data))
}
