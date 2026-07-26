import UIKit

enum TabsFontWeight {

  static func font(from value: String?) -> UIFont.Weight {
    switch value?.lowercased() {
    case "ultralight", "100": return .ultraLight
    case "thin", "200": return .thin
    case "light", "300": return .light
    case "medium", "500": return .medium
    case "semibold", "600": return .semibold
    case "bold", "700": return .bold
    case "heavy", "800": return .heavy
    case "black", "900": return .black
    default: return .regular
    }
  }

  static func symbol(from value: String?) -> UIImage.SymbolWeight {
    switch value?.lowercased() {
    case "ultralight", "100": return .ultraLight
    case "thin", "200": return .thin
    case "light", "300": return .light
    case "medium", "500": return .medium
    case "semibold", "600": return .semibold
    case "bold", "700": return .bold
    case "heavy", "800": return .heavy
    case "black", "900": return .black
    default: return .regular
    }
  }
}
