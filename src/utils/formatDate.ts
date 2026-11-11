export const formatDate = (date: string, showTime: boolean = false): string => {
  let formattedDate = new Date(date).toLocaleDateString();

  if (showTime) {
    formattedDate += ` ${new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  return formattedDate;
};
