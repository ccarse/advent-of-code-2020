input = File.read("input.txt").split("\n")

def mask_value(bitmask, decimal_value)
  ret = ""
  binary_value = decimal_value.to_s(2).rjust(36, '0')
  bitmask.split('').each.with_index do |b, i| 
    if b == "X"
      ret << binary_value[i]
    else
      ret << b
    end
  end
  ret
end

mem = []
mask = "11100XX0000X1101X1010100X1010001XX0X"
input.each do |i|
  if i[0,4] == "mask"
    mask = i.split("=")[1].strip
  else
    components = i.split("=")
    address = components[0][4..-2].to_i
    value = components[1].strip.to_i
    mem[address] = mask_value(mask, value)
  end
end

p mem.compact.map{|m| m.to_i(2)}.inject(:+)