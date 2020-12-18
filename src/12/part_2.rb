directions = File.read("input.txt").split("\n")

direction = 90

ship_x = 0
ship_y = 0
waypoint_x = 10
waypoint_y = 1

def get_curr_direction(direction)
  if (direction % 360) == 0
    return 'N'
  end
  d = 360.to_f / (direction % 360)
  case d
  when 1
    return 'N'
  when 4
    return 'E'
  when 2
    return 'S'
  else
    return 'W'
  end
end

directions.each do |d| 
  action = d[0]
  value = d[1..-1].to_i

  if action == 'F'
    ship_x += (waypoint_x * value)
    ship_y += (waypoint_y * value)
  end

  if action == 'N'
    waypoint_y += value
  end
  if action == 'S'
    waypoint_y -= value
  end
  if action == 'E'
    waypoint_x += value
  end
  if action == 'W'
    waypoint_x -= value
  end
  if action == 'L'
    (value / 90).times { waypoint_x, waypoint_y = -waypoint_y, waypoint_x }
  end
  if action == 'R'
    (value / 90).times { waypoint_x, waypoint_y = waypoint_y, -waypoint_x }
  end

  puts "d: #{d} waypoint_x: #{waypoint_x} waypoint_y: #{waypoint_y} ship_x: #{ship_x} ship_y: #{ship_y}"
end

puts "Answer: #{ship_x.abs + ship_y.abs}"


