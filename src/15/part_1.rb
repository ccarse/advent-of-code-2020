input = [17,1,3,16,19,0]

spoken = []
2020.times do |i|
  if spoken.length < input.length 
    spoken << input[i]
  else
    previous = spoken[i - 1]
    prev_indexes = spoken.each_index.select do |i| spoken[i] == previous end
    if prev_indexes.length == 1
      spoken << 0
    else
      spoken << ((i - 1) - prev_indexes[-2])
    end
  end
end
p spoken.last