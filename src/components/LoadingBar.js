import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LoadingBar(props) {
//   const [progress, setProgress] = React.useState(50);
//   const [buffer, setBuffer] = React.useState(10);

//   const progressRef = React.useRef(() => {});
//   React.useEffect(() => {
//     progressRef.current = () => {
//       if (progress > 100) {
//         setProgress(0);
//         setBuffer(10);
//       } else {
//         const diff = Math.random() * 10;
//         const diff2 = Math.random() * 10;
//         setProgress(progress + diff);
//         setBuffer(progress + diff + diff2);
//       }
//     };
//   });

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       progressRef.current();
//     }, 500);

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

  return (
    <div className='fixed top-0 w-full left-0 right-0 z-20'>
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="buffer" value={props.progress} valueBuffer={props.buffer} color="secondary"/>
    </Box></div>
  );
}