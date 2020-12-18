input = File.read("input.txt").split("\n")

def get_masks(bitmask)
  # p bitmask
  ret = []
  
  if bitmask.include? "X"
    zero_dup = bitmask.dup
    one_dup = bitmask.dup
    idx = bitmask.index("X")
    
    zero_dup[idx] = "0"
    ret.concat(get_masks(zero_dup))
    one_dup[idx] = "1"
    ret.concat(get_masks(one_dup))
  else 
    ret << bitmask
  end
  ret.flatten
end

def mask_value(mask, val)
  bv = val.to_i.to_s(2).rjust(36, '0')
  r = ""
  mask.split('').each.with_index do |m, i| 
    if m == "1"
      r << "1"
    elsif m == "X"
      r << "X"
    else
      r << bv[i]
    end
  end
  r
end

mem = {}
mask = ""
input.each do |i|
  if i[0,4] == "mask"
    mask = i.split("=")[1].strip
  else
    components = i.split("=")
    address = components[0][4..-2]
    value = components[1].strip.to_i
    masked = mask_value(mask, address)
    masks = get_masks(masked)
    masks.each do |m| 
      mem[m] = value 
    end
  end
end
require 'json'

p mem.values.inject(:+)



# p mem.keys.map {|d| d.to_i(2)}
# p get_masks("00000000000000000000000000000000X0XX")