export const messageFitter = function(array) {
  let parentTemp = [];
  array.forEach(item => {
    array.forEach(element => {
      if (
        item.FK_parentGuid !== "" &&
        item.FK_parentGuid === element.PK_messageGuid
      ) {
        item.parentNickname = element.nickname;
      }
    });
  });
  array.forEach(element => {
    if (element.FK_parentLineageGuid === "") {
      parentTemp.push(element);
    }
  });
  parentTemp.forEach(item => {
    array.forEach(element => {
      if (element.FK_parentLineageGuid === item.PK_messageGuid) {
        if (item.children) {
          item.children.push(element);
        } else {
          item.children = [];
          item.children.push(element);
        }
      }
    });
  });
  array.forEach(element => {
    if (element.children) {
      element.children.reverse();
    }
  });
  return parentTemp;
};
