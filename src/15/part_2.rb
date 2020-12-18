input = [17,1,3,16,19,0]
# input = [0, 3, 6]

spoken = []
spoken_h = {}

iterations = 30_000_000
iterations.times do |i|
  if i % (iterations / 100) == 0 then puts "#{i / (iterations / 100)}%" end

  if spoken.length < input.length 
    spoken_h[input[i]] = [i]
    spoken << input[i]
  else
    previous = spoken[i - 1]
    prev_indexes = spoken_h[previous]
    if prev_indexes.length == 1
      spoken << 0
    else
      spoken << ((i - 1) - prev_indexes[-2])
    end
    if !spoken_h[spoken.last] 
      spoken_h[spoken.last] = [i] 
    else 
      spoken_h[spoken.last] << i
    end
  end
end

p spoken.last