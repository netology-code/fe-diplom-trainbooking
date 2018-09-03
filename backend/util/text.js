export const capitalize = words => words
  .split( ' ' )
  .map( word => word[ 0 ].toUpperCase() + word.substr( 1 ))
  .join( ' ' );
