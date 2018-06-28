// A linear map of `value` from `domain` onto `range`.
// Linear maps can be represented as linear functions.
// In this case, we are putting our inputs (which are two coordinates)
// into two-point form:
// https://en.wikipedia.org/wiki/Linear_equation#Two-point_form
export default function linearScale({
  domain = [0, 1],
  range = [0, 1],
  value = 0,
} = {}) {
  if (domain[0] === domain[1]) {
    return domain[0];
  }

  const slope = (range[1] - range[0]) / (domain[1] - domain[0]);

  return slope * (value - domain[0]) + range[0];
}
