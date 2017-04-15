
export const calculatePercentage = (support, against) => {
  let total = support + against
  let result = support / total
  console.log(result)
  return result
}
