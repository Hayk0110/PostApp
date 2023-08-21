function calculateAverageRate(comments) {
    if (comments.length === 0) {
      return 0
    }
  
    const totalRate = comments.reduce((sum, comment) => sum + comment.rate, 0);
    return totalRate / comments.length;
}

module.exports = function sortData(data, sortType){
    if (sortType === "by date") {
        return data.sort((a, b) => b.createdAt - a.createdAt);
      } else if (sortType === "by rate") {
        return data.sort((a, b) => calculateAverageRate(b.comments) - calculateAverageRate(a.comments));
      }
}