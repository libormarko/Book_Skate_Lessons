export const scrollToTopOfPage = () => {
  window.scrollTo(0, 0);
};

export const scrollSkateParkItemToTheTop = (
  skateParkItemsRef: any,
  skateParksListRef: any,
  selectedSkatePark: any
) => {
  const foundSkateParkItem = skateParkItemsRef.current.find(
    (elem: any) => elem.dataset.skateParkId === selectedSkatePark?.id
  );
  const skateParkItemTop = foundSkateParkItem?.getBoundingClientRect().top;
  const skateParksListTop = skateParksListRef?.current?.getBoundingClientRect().top;
  if (skateParkItemTop && skateParksListTop && selectedSkatePark?.source === 'marker') {
    skateParksListRef?.current?.scrollBy({
      top: skateParkItemTop - skateParksListTop,
      behavior: 'smooth'
    });
  }
};
