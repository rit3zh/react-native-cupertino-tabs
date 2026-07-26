import UIKit

final class CupertinoSegmentedControl: UISegmentedControl {

  var isTrackTransparent = false {
    didSet { setNeedsLayout() }
  }

  var isSelectionTransparent = false {
    didSet { setNeedsLayout() }
  }

  var trackCornerRadius: CGFloat? {
    didSet { setNeedsLayout() }
  }

  var onUserInterfaceStyleChange: (() -> Void)?

  var onPressChange: (() -> Void)?


  var onInteractionEnd: (() -> Void)?

  var isPressed: Bool {
    switch pressRecognizer.state {
    case .began, .changed: return true
    default: return false
    }
  }


  var isInteracting: Bool { isPressed || isSettling }

  private(set) var pressEndSegment: Int?

  private(set) var isFadingSegments = false

  private var isSettling = false
  private var settleLink: CADisplayLink?
  private var settleStart: CFTimeInterval = 0
  private var sawSettleAnimation = false
  private var fadedViews: [UIView] = []
  private var lastUserInterfaceStyle: UIUserInterfaceStyle?
  private let pressRecognizer = UILongPressGestureRecognizer()

  override init(frame: CGRect) {
    super.init(frame: frame)

    pressRecognizer.addTarget(self, action: #selector(handlePress))
    pressRecognizer.minimumPressDuration = 0
    pressRecognizer.cancelsTouchesInView = false
    pressRecognizer.delaysTouchesBegan = false
    pressRecognizer.delaysTouchesEnded = false
    pressRecognizer.delegate = self
    addGestureRecognizer(pressRecognizer)
  }

  @available(*, unavailable)
  required init(coder: NSCoder) {
    fatalError("init(coder:) is not supported")
  }

  override func layoutSubviews() {
    super.layoutSubviews()

    if lastUserInterfaceStyle != traitCollection.userInterfaceStyle {
      lastUserInterfaceStyle = traitCollection.userInterfaceStyle
      onUserInterfaceStyleChange?()
    }

    for view in fadedViews where view.superview === self {
      view.alpha = 1
    }
    fadedViews.removeAll()

    let chrome = subviews.filter { !Self.containsSegment($0) }
    applyTrackCornerRadius(to: chrome)

    guard isTrackTransparent || isSelectionTransparent else { return }

    let selectionIndicator = Self.usesLiquidGlass ? nil : chrome.last

    for view in chrome {
      let shouldHide =
        view === selectionIndicator ? isSelectionTransparent : isTrackTransparent
      guard shouldHide else { continue }
      view.alpha = 0
      fadedViews.append(view)
    }
  }

  private func applyTrackCornerRadius(to chrome: [UIView]) {
    guard let trackCornerRadius else { return }

    layer.cornerRadius = trackCornerRadius
    layer.masksToBounds = true

    for view in chrome where view.bounds.width >= bounds.width - 1 {
      view.layer.cornerRadius = trackCornerRadius
      view.layer.masksToBounds = true
    }
  }

  func restoreSelection(to index: Int) {
    guard index >= 0, index < numberOfSegments else { return }
    UIView.animate(withDuration: CupertinoTabsConstants.tintDuration) {
      self.selectedSegmentIndex = index
      self.layoutIfNeeded()
    }
  }

  @objc private func handlePress() {
    switch pressRecognizer.state {
    case .began:
      endSettling(notify: false)
      pressEndSegment = nil
    case .changed:
      break
    case .ended:
      pressEndSegment = releasedSegment()
      beginSettling()
    default:
      pressEndSegment = nil
      beginSettling()
    }
    onPressChange?()
  }

  private func beginSettling() {
    settleLink?.invalidate()
    isSettling = true
    settleStart = CACurrentMediaTime()
    sawSettleAnimation = false

    let link = CADisplayLink(target: self, selector: #selector(checkSettled))
    link.add(to: .main, forMode: .common)
    settleLink = link
  }

  @objc private func checkSettled() {
    let elapsed = CACurrentMediaTime() - settleStart
    let isAnimating = subviews.contains(where: Self.isAnimating)

    if isAnimating {
      sawSettleAnimation = true
      guard elapsed >= CupertinoTabsConstants.settleDuration else { return }
      endSettling(notify: true)
      return
    }

    if !sawSettleAnimation, elapsed < CupertinoTabsConstants.settleGrace { return }
    endSettling(notify: true)
  }

  private func endSettling(notify: Bool) {
    settleLink?.invalidate()
    settleLink = nil
    guard isSettling else { return }
    isSettling = false
    if notify { onInteractionEnd?() }
  }

  private func releasedSegment() -> Int? {
    guard
      let index = segmentIndex(at: pressRecognizer.location(in: self)),
      isEnabledForSegment(at: index)
    else { return nil }
    return index
  }

  private func segmentIndex(at point: CGPoint) -> Int? {
    let segments = segmentViews()
    if let index = segments.firstIndex(where: {
      $0.convert($0.bounds, to: self).contains(point)
    }) {
      return index
    }
    guard numberOfSegments > 0, bounds.width > 0, bounds.contains(point) else {
      return nil
    }
    let index = Int(point.x / (bounds.width / CGFloat(numberOfSegments)))
    return min(max(index, 0), numberOfSegments - 1)
  }

  func fadeSegments(duration: TimeInterval, changes: () -> Void) {
    let segments = segmentViews()
    guard
      !segments.isEmpty,
      window != nil,
      !isInteracting,
      !segments.contains(where: Self.isAnimating)
    else {
      UIView.performWithoutAnimation(changes)
      return
    }

    CATransaction.begin()
    isFadingSegments = true
    CATransaction.setCompletionBlock { [weak self] in
      self?.isFadingSegments = false
    }
    for segment in segments {
      let fade = CATransition()
      fade.type = .fade
      fade.duration = duration
      fade.timingFunction = CAMediaTimingFunction(name: .easeInEaseOut)
      segment.layer.add(fade, forKey: "cupertinoTabsTint")
    }
    changes()
    CATransaction.commit()
  }

  private func segmentViews(in view: UIView? = nil) -> [UIView] {
    var found: [UIView] = []
    for subview in (view ?? self).subviews {
      if Self.isSegment(subview) {
        found.append(subview)
      } else {
        found.append(contentsOf: segmentViews(in: subview))
      }
    }
    return found.sorted {
      $0.convert($0.bounds, to: self).minX < $1.convert($1.bounds, to: self).minX
    }
  }

  private static var usesLiquidGlass: Bool {
    if #available(iOS 26.0, *) { return true }
    return false
  }

  private static func isAnimating(_ view: UIView) -> Bool {
    if view.layer.animationKeys()?.isEmpty == false { return true }
    return view.subviews.contains(where: isAnimating)
  }

  private static func isSegment(_ view: UIView) -> Bool {
    String(describing: type(of: view)) == "UISegment"
  }

  private static func containsSegment(_ view: UIView) -> Bool {
    if isSegment(view) { return true }
    return view.subviews.contains(where: containsSegment)
  }
}

extension CupertinoSegmentedControl: UIGestureRecognizerDelegate {
  func gestureRecognizer(
    _ gestureRecognizer: UIGestureRecognizer,
    shouldRecognizeSimultaneouslyWith other: UIGestureRecognizer
  ) -> Bool {
    true
  }
}
