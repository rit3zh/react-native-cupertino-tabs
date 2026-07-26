import UIKit

final class TabIconLoader {

  var onLoad: (() -> Void)?

  private var cache: [String: UIImage] = [:]
  private var inFlightRequests: Set<String> = []

  func image(for uri: String) -> UIImage? {
    if let cached = cache[uri] { return cached }

    if let bundled = UIImage(named: uri) {
      cache[uri] = bundled
      return bundled
    }

    guard let url = URL(string: uri) else { return nil }

    if url.isFileURL, let image = UIImage(contentsOfFile: url.path) {
      cache[uri] = image
      return image
    }

    if url.scheme == "data",
      let data = try? Data(contentsOf: url),
      let image = UIImage(data: data)
    {
      cache[uri] = image
      return image
    }

    guard url.scheme == "http" || url.scheme == "https" else { return nil }
    guard !inFlightRequests.contains(uri) else { return nil }
    inFlightRequests.insert(uri)

    URLSession.shared.dataTask(with: url) { [weak self] data, _, _ in
      DispatchQueue.main.async {
        guard let self else { return }
        self.inFlightRequests.remove(uri)
        guard let data, let image = UIImage(data: data) else { return }
        self.cache[uri] = image
        self.onLoad?()
      }
    }.resume()

    return nil
  }
}
