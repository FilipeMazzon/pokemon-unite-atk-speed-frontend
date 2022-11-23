export const getColor = (speed: number) => {
  switch (speed) {
    case 16:
      return '#57bb8a';
    case 20:
      return '#73b87e';
    case 24:
      return '#94bd77';
    case 28:
      return '#b0be6e';
    case 32:
      return '#d4c86a'
    case 36:
      return '#f5ce62';
    case 40:
      return '#e6ad61';
    case 44:
      return '#e9a268';
    case 48:
      return '#e5926b';
    case 52:
      return '#e0816d'
    case 56:
      return '#dd776e'
    case 60:
      return '#FF0000'
    default:
      return "#FF0000";
  }
}

//  if (value > 272.5) {
//     return 16;
//   }
//   if (value > 202.4) {
//     return 20;
//   }
//   if (value > 151.81) {
//     return 24;
//   }
//   if (value > 115.99) {
//     return 28;
//   }
//   if (value > 89.04) {
//     return 32;
//   }
//   if (value > 68.05) {
//     return 36;
//   }
//   if (value > 51.29) {
//     return 40;
//   }
//   if (value > 37.56) {
//     return 44;
//   }
//   if (value > 26.11) {
//     return 48;
//   }
//   if (value > 16.42) {
//     return 52;
//   }
//   if (value > 8.1) {
//     return 56;
//   }
//   if (value > 0) {
//     return 60;
//   }
