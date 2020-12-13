def clone_array(array)
  return array.clone.map(&:clone)
end

def print_prog(arr)
  for row in arr do 
    puts row.join
  end
  puts ""
end

def check(array, row, col, row_inc, col_inc, mult = 1)
  row_adj = row_inc * mult
  col_adj = col_inc * mult
  if (row + row_adj) < 0 then row_adj = 9999999999 end
  if (col + col_adj) < 0 then col_adj = 9999999999 end

  row_to_check = row + row_adj
  col_to_check = col + col_adj
  if array[row_to_check] && array[row_to_check][col_to_check] && array[row_to_check][col_to_check] == "." 
    return check(array, row, col, row_inc, col_inc, mult += 1)
  end
  return array[row_to_check] && array[row_to_check][col_to_check]
end

def get_new_state(array, row, col)
  count = 0
  current_state = array[row][col]

  if check(array, row, col, -1, 0) == "#" then count += 1 end
  if check(array, row, col, 1, 0) == "#" then count += 1 end 
  if check(array, row, col, 0, -1) == "#" then count += 1 end 
  if check(array, row, col, 0, 1) == "#" then count += 1 end 
  if check(array, row, col, -1, -1) == "#" then count += 1 end 
  if check(array, row, col, -1, 1) == "#" then count += 1 end 
  if check(array, row, col, 1, -1) == "#" then count += 1 end 
  if check(array, row, col, 1, 1) == "#" then count += 1 end 
  
  if current_state == 'L' && count == 0 then
    return '#'
  end
  if current_state == '#' && count >= 5 then 
    return 'L'
  end
  return current_state
end

def run_prog(arr)
  next_arr = clone_array(arr)
  arr.each_with_index do |row, row_index|
    row.each_with_index do |column, col_index|
      new_state = get_new_state(arr, row_index, col_index)
      next_arr[row_index][col_index] = new_state
    end
  end
  next_arr
end

def main
  a = File.read("input.txt").split("\n").map { |r| r.split("") }

  while true do
    b = run_prog(a)
    if a.flatten.count("L") == b.flatten.count("L") && a.flatten.count("#") == b.flatten.count("#")
      p b.flatten.count("#")
      break
    end
    
    a = clone_array(b)
  end
end

main()