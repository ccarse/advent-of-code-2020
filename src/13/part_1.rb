input = File.read("input.txt").split("\n")
ts = input[0].to_i
routes = input[1].split(",").filter{|r| r != "x"}.map(&:to_i)

# p routes
min_times = routes.map do |r| 
  counter = 0
  while counter < ts do
    counter += r
  end
  [r, counter]
end

ans = min_times.sort{|m, n| m[1] - n[1]}.first
p ans
p (ans[1] - ts) * ans[0]