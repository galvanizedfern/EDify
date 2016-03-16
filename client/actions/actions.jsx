export const changeCurrentVideo = (value) => {
  return {
    type: 'CHANGE_VIDEO',
    value: value
  };
};

export const fetchVideoList = () => {
  return {
    type: 'FETCH_VIDEOS'
  };
};