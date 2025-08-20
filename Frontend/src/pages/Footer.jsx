const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow-sm">
      <div className="w-full mx-auto max-w-screen-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <span className="text-sm text-gray-500 text-center md:text-left mb-3 md:mb-0">
          © 2025 <a href="https://thatsthefinger.com/" className="hover:underline">CodeView™</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap justify-center items-center text-sm font-medium text-gray-500 space-x-4 md:space-x-6">
          <li>
            <a href="#" className="hover:underline">About</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Licensing</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

// const Footer = () => {
//   return (
//     <footer className="fixed bottom-0 left-0 w-full bg-white rounded-t-lg shadow-sm">
//       <div className="w-full mx-auto max-w-screen-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between">
//         <span className="text-sm text-gray-500 text-center md:text-left mb-3 md:mb-0">
//           © 2025 <a href="https://thatsthefinger.com/" className="hover:underline">CodeView™</a>. All Rights Reserved.
//         </span>
//         <ul className="flex flex-wrap justify-center items-center text-sm font-medium text-gray-500 space-x-4 md:space-x-6">
//           <li><a href="#" className="hover:underline">About</a></li>
//           <li><a href="#" className="hover:underline">Privacy Policy</a></li>
//           <li><a href="#" className="hover:underline">Licensing</a></li>
//           <li><a href="#" className="hover:underline">Contact</a></li>
//         </ul>
//       </div>
//     </footer>
//   );
// };
// export default Footer;