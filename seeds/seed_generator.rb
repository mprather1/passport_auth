require 'json'
require 'faker'

File.open('seeds/tasks.json', 'w') do |file|
file.puts('[')  
8.times do
  @location_number = Faker::Number.number(3)
  @project = Faker::Name.last_name
  @descrip = Faker::Hacker.say_something_smart
  @requestor = Faker::Name.name
  @assigned_to = Faker::Name.name
  @due_date = Faker::Date.forward(365)
  @notes = Faker::Hipster.sentence(3, false, 4)

  my_hash = {
    completed: false,
    location_number: @location_number,
    project: @project,
    descrip: @descrip,
    priority: "low",
    requestor: @requestor,
    assigned_to: @assigned_to,
    due_date: @due_date,
    notes: @notes
  }
  file.puts(JSON.generate(my_hash) + ",")
end

8.times do
  @location_number = Faker::Number.number(3)
  @project = Faker::Name.last_name
  @descrip = Faker::Hacker.say_something_smart
  @requestor = Faker::Name.name
  @assigned_to = Faker::Name.name
  @due_date = Faker::Date.forward(365)
  @notes = Faker::Hipster.sentence(3, false, 4)

  my_hash = {
    completed: true,
    location_number: @location_number,
    project: @project,
    descrip: @descrip,
    priority: "high",
    requestor: @requestor,
    assigned_to: @assigned_to,
    due_date: @due_date,
    notes: @notes
  }
  file.puts(JSON.generate(my_hash) + ",")
end
file.puts("]")
end