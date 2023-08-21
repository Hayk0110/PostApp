export function rateAvarage(arr , withIsInList) {
  arr.map(post => {
    if (post.comments.length > 0) {
      post.averageRate = +(post.comments.reduce((total, next) => total + next.rate, 0) / post.comments.length).toFixed(1);
    } else {
      post.averageRate = 0; 
    }
    if(withIsInList){
      post.isInList = false;
    }
    return post;
  })
  return arr;
}

export function sortBy(arr, prop, type) {
  switch (type) {
    case "ascending order":
      return arr.sort((a, b) => a[prop] - b[prop]);
    case "descending order":
      return arr.sort((a, b) => b[prop] - a[prop]);
    default:
      break;
  }
}

export function searchComent(arr, value) {
  const newArr = arr.map((post) => {
    const isFound = post.comments.find((com) =>
      com.text.toLowerCase().includes(value.toLowerCase())
    );

    if (isFound) {
      return post;
    }

  }).filter((post) => post);

  return newArr;
};

export function getHighestAverageRatePost(posts) {
  let highestPost = null;
  for (const post of posts) {
    if (!post.isInList && (!highestPost || post.averageRate > highestPost.averageRate)) {
      highestPost = post;
    }
  }
  highestPost.isInList = true;
  return highestPost;
}

export function queryString(obj){
  for(const key in obj){
    if(obj[key] == null){
      continue;
    }
    obj[key] = obj[key].split(" ").join("+")
  }
  return obj;
}

export const generatePageButtons = (totalPages, currentPage) => {
  if (totalPages <= 10) {
    return Array.from({ length: totalPages }, (value, index) => index + 1);
  } else {
    if (currentPage <= 5) {
      return Array.from({ length: 10 }, (value, index) => index + 1);
    } else if (currentPage >= totalPages - 4) {
      return Array.from(
        { length: 10 },
        (value, index) => totalPages - 9 + index
      );
    } else {
      return Array.from(
        { length: 10 },
        (value, index) => currentPage - 5 + index
      );
    }
  }
};