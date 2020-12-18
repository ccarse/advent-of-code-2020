directions = File.read("input.txt").split("\n")

direction = 90
x = 0 # horizontal
y = 0 # vertical

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
    action = get_curr_direction(direction)
  end

  if action == 'N'
    y += value
  end
  if action == 'S'
    y -= value
  end
  if action == 'E'
    x += value
  end
  if action == 'W'
    x -= value
  end
  if action == 'L'
    direction -= value
  end
  if action == 'R'
    direction += value
  end
end

puts "x: #{x} y: #{y} direction: #{direction} answer: #{x.abs + y.abs}"