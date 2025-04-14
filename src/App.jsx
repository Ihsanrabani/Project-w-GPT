import './index.css'
import { useState, useEffect} from 'react'

function App() {

  // 🔴🔴THING TODO🔴🔴
  // 1. Count si habit nya
  // 2. Setiap hari si habit completed dan tombol done nya tereset [📝TEST BESOK]

  // Mengambil Data dari LocalStorage
  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem("Habits")) || []
    const lastDate = localStorage.getItem("LastOpenedDate")
    
    // Mereset Habit di hari berikutnya
    if (lastDate !== currentDate) {
      const resetHabits = habits.map(habit => ({
          ...habit,
          Completed: false
      }))

      localStorage.setItem("Habits", JSON.stringify(resetHabits))
      localStorage.setItem("LastOpenedDate", currentDate)
      setHabits(resetHabits)
    } else {
      setHabits(savedHabits)
    }
  }, []);

  const [isVisible, setIsVisible] = useState(false)
  const [isAny, setIsAny] = useState(false)
  const [habits, setHabits] = useState([])
  const [newHabitTitle, setNewHabitTitle] = useState("")
  const [newHabitDesc, setNewHabitDesc] = useState("")
  // const [btnDoneColor, setBtnDoneColor] = useState("bg-green-400 text-gray-800")
  const date = new Date()

  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const currentDate = day + '-' + month + '-' +year
  const currentDatee = day +1 + '-' + month + '-' +year

  const handleAddHabit = (e) => {
    e.preventDefault();

    if (newHabitTitle === "") {
      alert("Isi nama habit!")
      return;
    } 

    const newHabit = {
      Title: newHabitTitle,
      Desc: newHabitDesc,
      Completed: false,
      CompletedCount: 0,
      CreatedDate: currentDate,
    }
    
    setHabits(prev => {
      const updateHabits = [...prev, newHabit]
      localStorage.setItem("Habits", JSON.stringify(updateHabits))
      return updateHabits
    })

    alert("Habit Baru telah di tambahkan!")
    setNewHabitTitle("")
    setNewHabitDesc("")
    setIsVisible(false)
  }

  const handleHabitDone = (habitData, index) => {
    const updateHabits = [...habits]
    // Mengubah status completed jadi true & Menambah kan 1 hari pada completedCount
    updateHabits[index].Completed = true
    updateHabits[index].CompletedCount = + 1
    // setBtnDoneColor("bg-gray-400 text-white")
    alert(`Yeay Habit ${habitData.Title} udah beres!🎊`)
    setHabits(updateHabits)
    localStorage.setItem("Habits", JSON.stringify(updateHabits));
  }

  const handleDeleteHabit = (indexHabit, habit) => {
    const question = confirm("Kamu yakin ingin menghapus habit " + habit.Title)

    if (question) {
      const updatedHabits = habits.filter((_, i) => i !== indexHabit)
      setHabits(updatedHabits)
      localStorage.setItem("Habits", JSON.stringify(updatedHabits))
    }
  }

  // Menampilkan Pesan "Kamu belum punya habit!"
  useEffect(() => {
    if (habits == "") {
      setIsAny(true)
    } else if (habits !== "") {
      setIsAny(false)
    }
  }, [habits])

  // ⚠️⚠️ MASIH ADA KEMUNGKINAN ERROR YANG FITUR HABIT RESET SETIAP HARI⚠️⚠️

  return (
    <>
      <div className='min-h-screen flex flex-col'>
        <nav className='py-4 text-center bg-gray-200 mb-10'>
          <h1 className='text-xl font-bold hover:text-green-400 ease-out duration-300'>Habit Tracker Harian</h1>
        </nav>

        <div className='px-2 md:px-24 xl:px-[30%]'>

          <h1 className='text-xl mb-10 font-bold'>Tanggal: {currentDate}</h1>
          <button onClick={() => { sim1Day() }}>Simulasi 1 Hari</button>

          {/* Habits List Section */}
          <div>

            {/* HABITS LIST/CARDS */}
            <div className='mb-10'>
              <div className='border border-b-0 border-slate-300 mx-[30%] rounded-t-md'>
                <h1 className='text-center text-xl font-bold'>Habits Kamu!</h1>
              </div>

              <div className='border border-slate-300 mx-2 rounded-md mb-3'>
                {
                  isAny &&
                  <h1 className='text-xl text-center py-10 font-bold text-gray-400'>Kamu belum punya habit!</h1>
                }
                {habits.map((habit, index) => (
                  <div className='bg-slate-200 m-3 rounded-md px-2 py-1 relative' key={index}>
                    <div className=''>
                      <div className='flex justify-between items-center'>
                        <h1 className='text-xl font-bold '>{habit.Title}</h1>
                        <p className='text-sm text-gray-400/70'>Created: {habit.CreatedDate}</p>
                      </div>
                      <p className='text-sm text-ellipsis'>{habit.Desc}</p>
                    </div>
                    <div className='flex gap-2 justify-end'>
                      <button className={`p-1 px-3 rounded-md shadow-md hover:-translate-y-1 hover:shadow-lg hover:bg-green-450 ease-out duration-300 ${habit.Completed ? `bg-gray-400 text-white cursor-not-allowed` : `bg-green-400 text-gray-800`}`} onClick={() => handleHabitDone(habit, index)}>Done</button>
                      <button className={`p-1 px-3 rounded-md shadow-md hover:-translate-y-1 hover:shadow-lg hover:bg-green-450 ease-out duration-300 bg-red-400 text-white`} onClick={() => { handleDeleteHabit(index, habit) }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className='mx-2 text-right'>
                <button className='bg-sky-300 text-gray-800 py-1 px-2 rounded-md' onClick={() => { setIsVisible(true) }}>
                  Tambah Habit
                </button>
              </div>
            </div>
          </div>



          {/* PENCAPAIAN HABITS */}
          <div className='border border-b-0 border-slate-300 mx-[30%] rounded-t-md'>
            <h1 className='text-center text-xl font-bold'>Pencapaian Habits Kamu</h1>
          </div>
          <div>
            <div className='border border-slate-300 rounded-md flex flex-col gap-5 mx-2 p-3 md:grid md:grid-cols-2'>

              {habits.map((habit, index) => (
                <div className='bg-slate-200 text-center py-4 mx-[15%] ' key={index}>
                  <h1 className='text-3xl font-bold mb-4'>{habit.Title}</h1>
                  <p className='text-md mb-3'>Completed:</p>
                  <h1 className='text-4xl font-bold'>{habit.CompletedCount}</h1>
                </div>
              ))}

            </div>
          </div>

        </div>


        {/* Pop-up */}
        {
          isVisible &&
          <div className={`absolute h-screen w-screen inset-0 bg-gray-500/40 flex flex-col justify-center ease-in duration-300`}>
            <div className='bg-white mx-[10%] md:mx-[30%] xl:mx-[34%] p-4 rounded-md'>
              <div className='flex justify-between mb-4'>
                <h1 className='text-xl font-bold'>Tambah Habit</h1>
                <button className='border border-black/50 w-7 h-7 rounded-full' onClick={() => { setIsVisible(false) }}>X</button>
              </div>
              <form action="" className='text-center flex flex-col px-8 gap-3'>
                <input
                  type="text"
                  required
                  placeholder='Masukkan Nama Habit'
                  className='bg-gray-200 p-1 rounded-md text-ellipsis'
                  value={newHabitTitle}
                  onChange={(e) => setNewHabitTitle(e.target.value)}
                />

                <input
                  type="text"
                  required
                  placeholder='Masukkan Deskripsi Habit'
                  className='bg-gray-200 p-1 rounded-md text-ellipsis'
                  value={newHabitDesc}
                  onChange={(e) => setNewHabitDesc(e.target.value)}
                />
                <div className='text-right mt-2'>
                </div>
                <button className='bg-green-400 p-1 px-3 rounded-md text-gray-800 shadow-md' onClick={handleAddHabit}>Tambah</button>
              </form>
            </div>
          </div>
        }

        <footer className='bg-gray-200 text-center p-4 mt-auto'>
          <p className=''>© 2025 Habit Tracker Harian by Ihsan. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}

export default App
