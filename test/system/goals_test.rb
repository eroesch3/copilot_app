require "application_system_test_case"

class GoalsTest < ApplicationSystemTestCase
  setup do
    @goal = goals(:one)
  end

  test "visiting the index" do
    visit goals_url
    assert_selector "h1", text: "Goals"
  end

  test "creating a Goal" do
    visit goals_url
    click_on "New Goal"

    fill_in "Category", with: @goal.category
    fill_in "End date", with: @goal.end_date
    fill_in "Frequency", with: @goal.frequency
    fill_in "Name", with: @goal.name
    check "Prompt" if @goal.prompt
    fill_in "Start date", with: @goal.start_date
    fill_in "Time budget", with: @goal.time_budget
    fill_in "User", with: @goal.user_id
    click_on "Create Goal"

    assert_text "Goal was successfully created"
    click_on "Back"
  end

  test "updating a Goal" do
    visit goals_url
    click_on "Edit", match: :first

    fill_in "Category", with: @goal.category
    fill_in "End date", with: @goal.end_date
    fill_in "Frequency", with: @goal.frequency
    fill_in "Name", with: @goal.name
    check "Prompt" if @goal.prompt
    fill_in "Start date", with: @goal.start_date
    fill_in "Time budget", with: @goal.time_budget
    fill_in "User", with: @goal.user_id
    click_on "Update Goal"

    assert_text "Goal was successfully updated"
    click_on "Back"
  end

  test "destroying a Goal" do
    visit goals_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Goal was successfully destroyed"
  end
end
