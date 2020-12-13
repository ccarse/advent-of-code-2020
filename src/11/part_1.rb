def clone_array(array)
  return array.clone.map(&:clone)
end

def get_new_state(array, address)
  count = 0
  row = address[0]
  column = address[1]
  current_state = array[row][column]

  row_u = row == 0 ? 999999 : row - 1
  row_d = row + 1
  col_r = column + 1
  col_l = column == 0 ? 999999 : column - 1

  if array[row][col_l] == '#' then count += 1 end
  if array[row][col_r] == '#' then count += 1 end
  if array[row_u] && array[row_u][column] == '#' then count += 1 end
  if array[row_d] && array[row_d][column] == '#' then count += 1 end
  if array[row_u] && array[row_u][col_l] == '#' then count += 1 end
  if array[row_d] && array[row_d][col_r] == '#' then count += 1 end
  if array[row_d] && array[row_d][col_l] == '#' then count += 1 end
  if array[row_u] && array[row_u][col_r] == '#' then count += 1 end

  if current_state == 'L' && count == 0 then
    return '#'
  end
  if current_state == '#' && count >= 4 then 
    return 'L'
  end

  return current_state
end

def run_prog(arr)
  next_arr = clone_array(arr)
  arr.each_with_index do |row, row_index|
    row.each_with_index do |column, col_index|
      new_state = get_new_state(arr, [row_index, col_index])
      # p new_state
      next_arr[row_index][col_index] = new_state
    end
  end
  next_arr
end

def print_prog(arr)
  for row in arr do 
    puts row.join
  end
  puts ""
end

a = File.read("input.txt").split("\n").map { |r| r.split("") }

while true do
  b = run_prog(a)

  if a.flatten.count("L") == b.flatten.count("L") && a.flatten.count("#") == b.flatten.count("#")
    p b.flatten.count("#")
    break
  end
  
  a = clone_array(b)
end