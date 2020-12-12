# input = File.read("small_input.txt").split("\n").map(&:to_i).sort
input = File.read("input.txt").split("\n").map(&:to_i).sort

prev = 0
counts = [0, 0]
input.each do |x|
  if (x - prev) == 1 then counts[0] = (counts[0] + 1) end
  if (x - prev) == 3 then counts[1] = (counts[1] + 1) end
  prev = x
end

# Part 1
p counts[0] * (counts[1] + 1)

# p input

input.unshift(0)
input << (input.last + 3)

prev = 0
groups = []
group = []
for i in input do
  if i - prev > 1 then 
    groups << group 
    group = []
  end
  group << i
  prev = i
end

if group.length > 0 then groups << group end

tribonacciSequence = [1, 1, 2, 4, 7, 13, 24, 44, 81, 149]; # The secret sauce

p groups

p groups.map { |g| tribonacciSequence[g.length - 1] }.inject(:*)
