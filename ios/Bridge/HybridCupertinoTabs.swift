import NitroModules
import UIKit

final class HybridCupertinoTabs: HybridCupertinoTabsSpec {

  let view: CupertinoTabsHostView
  let control = CupertinoSegmentedControl(frame: .zero)
  let feedback = UISelectionFeedbackGenerator()
  let iconLoader = TabIconLoader()

  override init() {
    view = CupertinoTabsHostView(control: control)
    super.init()

    control.addAction(
      UIAction { [weak self] _ in self?.handleValueChanged() },
      for: .valueChanged
    )

    control.onUserInterfaceStyleChange = { [weak self] in
      self?.setNeedsRebuild()
    }

    control.onPressChange = { [weak self] in
      self?.handlePressChange()
    }

    control.onInteractionEnd = { [weak self] in
      self?.flushDeferredUpdates()
    }

    iconLoader.onLoad = { [weak self] in
      self?.setNeedsRebuild()
    }
  }

  var items: [CupertinoTabItem] = [] {
    didSet {
      let signature = TabItemSignature.make(for: items)
      guard signature != itemsSignature else { return }
      itemsSignature = signature
      needsRebuild = true
    }
  }

  var selectedIndex: Double = 0 {
    didSet {
      guard selectedIndex != oldValue else { return }
      needsSelection = true
    }
  }

  var width: Double? {
    didSet {
      guard width != oldValue else { return }
      needsAppearance = true
    }
  }

  var height: Double? {
    didSet {
      guard height != oldValue else { return }
      needsAppearance = true
    }
  }

  var backgroundColor: String? {
    didSet {
      guard backgroundColor != oldValue else { return }
      needsAppearance = true
    }
  }

  var selectedBackgroundColor: String? {
    didSet {
      guard selectedBackgroundColor != oldValue else { return }
      needsAppearance = true
    }
  }

  var cornerRadius: Double? {
    didSet {
      guard cornerRadius != oldValue else { return }
      needsAppearance = true
    }
  }

  var activeTintColor: String? {
    didSet {
      guard activeTintColor != oldValue else { return }
      needsRebuild = true
    }
  }

  var inactiveTintColor: String? {
    didSet {
      guard inactiveTintColor != oldValue else { return }
      needsRebuild = true
    }
  }

  var direction: String? {
    didSet {
      guard direction != oldValue else { return }
      needsRebuild = true
    }
  }

  var gap: Double? {
    didSet {
      guard gap != oldValue else { return }
      needsRebuild = true
    }
  }

  var iconSize: Double? {
    didSet {
      guard iconSize != oldValue else { return }
      needsRebuild = true
    }
  }

  var apportionsSegmentWidthsByContent: Bool? {
    didSet {
      guard apportionsSegmentWidthsByContent != oldValue else { return }
      needsAppearance = true
    }
  }

  var hapticFeedback: Bool?

  var onChange: ((_ index: Double) -> Void)?

  func selectIndex(index: Double, animated: Bool) throws {
    let index = Int(index)
    guard index >= -1, index < control.numberOfSegments else { return }
    applySelection(index, animated: animated)
  }

  var needsRebuild = true
  var needsAppearance = true
  var needsSelection = true
  var itemsSignature = ""

  var committedSelection = UISegmentedControl.noSegment
  var hasCommitted = false

  var renderedActiveIndex = UISegmentedControl.noSegment

  func afterUpdate() {

    guard !control.isInteracting else { return }

    if needsRebuild {
      rebuildSegments()
      needsRebuild = false
      needsAppearance = true
      needsSelection = true
    }
    if needsAppearance {
      applyAppearance()
      needsAppearance = false
      view.setNeedsLayout()
    }
    if needsSelection {
      applySelection(Int(selectedIndex), animated: false)
      needsSelection = false
    }
  }

  func setNeedsRebuild() {
    needsRebuild = true
    afterUpdate()
  }

  func flushDeferredUpdates() {
    afterUpdate()
    paintTints(animated: true)
  }
}
