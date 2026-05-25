import { useEffect, useState } from "react";
import axios from "./../node_modules/axios/lib/axios";
const App = () => {
  const [userPhoto, setUserPhoto] = useState([]);
  const [page, setPage] = useState(1);

  
  useEffect(() => {
    const getPhoto = async () => {
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=15`,
      );
      setUserPhoto(response.data);
    };
    getPhoto();
  }, [page]);

  let printUserData = (
    <h1 className="text-4xl text-gray-500">Loading...</h1>
  );

  if (userPhoto.length > 0) {
    printUserData = userPhoto.map((elem, idx) => {
      return (
        <div
          key={idx}
          className="bg-white hover:scale-110  text-black rounded-2xl shadow shadow-gray-600 scroll-smooth"
        >
          <a href={elem.url} target="_blank">
            <div className="h-40 w-44 object-cover rounded-t-2xl overflow-hidden">
              <img
                className="h-full w-full "
                src={elem.download_url}
                alt={elem.author}
              />
            </div>
          </a>
          <h3 className="flex items-center font-medium m-2">{elem.author}</h3>
        </div>
      );
    });
  }

  return (
    <div className="h-screen w-full bg-white/50 overflow-y-hidden text-gray-700 flex flex-col">
      <div className="flex w-full flex-row items-center justify-start gap-2 drop-shadow shadow-xs shadow-gray-400 p-2 rounded-b  ">
        <img className="h-10" src="https://e1.pngegg.com/pngimages/298/237/png-clipart-macos-app-icons-preview.png" alt="" />
        <h1 className="font-medium text-2xl">Photo Gallery</h1>
      </div>
      <div className="flex flex-wrap gap-4 p-4 items-center justify-center h-[85vh] w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-400">
        {printUserData}
      </div>
      <div className="flex justify-center items-center gap-4 p-2">
        <button
          onClick={function () {
            if (page > 1) {
              setPage(page - 1);
              setUserPhoto([])
            }
          }}
          className="bg-blue-500  hover:bg-blue-700 rounded-full text-white font-medium py-1 px-4 "
        >
          Prev
        </button>
        <h1>Page {page}</h1>
        <button
          onClick={function () {
            setPage(page + 1);
            setUserPhoto([])
          }}
          className="bg-blue-500 hover:bg-blue-700 rounded-full text-white font-medium py-1 px-4"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
