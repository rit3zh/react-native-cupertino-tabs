import UIKit

extension HybridCupertinoTabs {

  var activeIndex: Int {
    committedSelection
  }

  func applySelection(_ index: Int, animated: Bool) {
    guard index >= -1, index < control.numberOfSegments else { return }

    ensureInitialCommit()

    guard !control.isInteracting else { return }

    if index != control.selectedSegmentIndex {
      control.selectedSegmentIndex = index
    }
    commitSelection(index)
  }

  func commitSelection(_ index: Int) {
    commitSelectionState(index)
    paintTints(animated: true)
  }

  @discardableResult
  func commitSelectionState(_ index: Int) -> Bool {
    guard index != committedSelection else { return false }
    committedSelection = index
    return true
  }

  func paintTints(animated: Bool) {
    guard activeIndex != renderedActiveIndex else { return }

    guard !control.isInteracting else { return }

    if animated {
      control.fadeSegments(duration: CupertinoTabsConstants.tintDuration) {
        refreshImageTints()
      }
    } else {
      UIView.performWithoutAnimation { refreshImageTints() }
    }
  }

  func ensureInitialCommit() {
    guard !hasCommitted else { return }
    committedSelection = Int(selectedIndex)
    hasCommitted = true
  }

  func handlePressChange() {

    guard !control.isPressed else { return }

    if let released = control.pressEndSegment {
      commitSelectionState(released)
      return
    }

    restoreCommittedSelection()
  }

  private func restoreCommittedSelection() {
    guard hasCommitted else { return }
    control.restoreSelection(to: committedSelection)
  }

  func handleValueChanged() {
    let index = control.selectedSegmentIndex
    guard index >= 0 else { return }

    if hapticFeedback == true {
      feedback.selectionChanged()
      feedback.prepare()
    }

    if !control.isPressed {
      commitSelection(index)
    }
    onChange?(Double(index))
  }
}
