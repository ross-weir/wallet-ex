/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default abstract class Page {
  /**
   * Opens a sub page of the page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */
  public open(): Promise<string> {
    // TODO: we can set the port when running `tauri-driver`, maybe pass this in instead of hardcoding
    return browser.url(this.url);
  }

  public abstract get url(): string;
}
