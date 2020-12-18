# Thanks Anthony 😭
def find_next(prime, prime_r, sum, prod, max)
  z = (1..max).find do |x|
    n = prod * x
    (sum + n) % prime == prime_r
  end
  z * prod
end

input = File.read("input.txt").split("\n")
buses = input[1].split(",");

list = buses.map.with_index{|x, i| [x, i] }.select{|x| x[0] != "x"}.map{|x| [x[0].to_i, (-1 * x[1]) % x[0].to_i] }
max = (list.map{|x| x[0]}.reduce(:*)
result = list.reduce([0, 1]) do |total, x|
  next_mult = find_next(x[0], x[1], total[0], total[1], max)
  [total[0] + next_mult, total[1] * x[0]]
end)[0]

p result