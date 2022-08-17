/**
 *验证是否存在参数,且不为空
 * @param {Array | Object} verifyArr 需要验证数组或对象
 * @param {Array} option
 * @returns {Boolean} 全部通过返回true,否则false
 */
const IsEmptyParameter = function (verifyArr, option) {
  if (!(verifyArr instanceof Object)) throw new Error('verifyArr:参数不合法')
  if (!Array.isArray(option)) throw new Error('option:参数不合法')
  let result = true
  option.forEach((item) => {
      if (verifyArr.hasOwnProperty(item)) {
          if (verifyArr[item] === '') {
              result = false
              return result
          }
      }
  })
  return result
}
export default IsEmptyParameter
/* instanceof用于检测构造函数的prototype属性是否出现在实例对象的原型链上
   Array.isArray()用于确认传递的值是否是一个数组 */
