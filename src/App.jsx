import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import {
  ArrowDown,
  CakeSlice,
  Camera,
  ChevronLeft,
  ChevronRight,
  Gift,
  Heart,
  Mail,
  MailOpen,
  Music2,
  Pause,
  RotateCcw,
  Sparkles,
  Volume2,
  X,
} from 'lucide-react'

/* =====================================================
   AUDIO / MUSIC
===================================================== */

const NOTES = {
  C3: 130.81,
  F3: 174.61,
  G3: 196,

  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392,
  A4: 440,
  B4: 493.88,

  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
}

const MELODY = [
  ['G4', 0.34],
  ['G4', 0.22],
  ['A4', 0.55],
  ['G4', 0.55],
  ['C5', 0.55],
  ['B4', 1.05],

  ['G4', 0.34],
  ['G4', 0.22],
  ['A4', 0.55],
  ['G4', 0.55],
  ['D5', 0.55],
  ['C5', 1.05],

  ['G4', 0.34],
  ['G4', 0.22],
  ['G5', 0.58],
  ['E5', 0.58],
  ['C5', 0.58],
  ['B4', 0.58],
  ['A4', 1.05],

  ['F5', 0.34],
  ['F5', 0.22],
  ['E5', 0.58],
  ['C5', 0.58],
  ['D5', 0.58],
  ['C5', 1.25],
]

const CHORDS = [
  ['C4', 'E4', 'G4'],
  ['G3', 'B4', 'D5'],
  ['C4', 'E4', 'G4'],
  ['F4', 'A4', 'C5'],
]

const BASS_NOTES = [
  'C3',
  'G3',
  'C3',
  'F3',
]

/*
  Melody + fade sekitar 17 detik.
  Animasi celebration mengikuti durasi ini.
*/

const SONG_DURATION_MS = 17400

/* =====================================================
   PHOTOS
===================================================== */

const PHOTOS = [
  {
    src: '/photos/photo-1.jpg',
    title: 'Adventure mode',
    caption:
      'Mumpung lagi liburan, nikmatin tempatnya, udaranya, dan semua cerita random di perjalanannya.',
  },

  {
    src: '/photos/photo-2.jpg',
    title: 'Santai dulu',
    caption:
      'Kadang yang dibutuhin cuma duduk santai, makan enak, ngobrol, dan nggak mikirin kerjaan sebentar.',
  },

  {
    src: '/photos/photo-3.jpg',
    title: 'Tetap jalan',
    caption:
      'Kalau capek ya istirahat. Nanti kalau tenaga udah balik, baru lanjut lagi.',
  },

  {
    src: '/photos/photo-4.jpg',
    title: 'Good energy',
    caption:
      'Semoga tahun ini lebih banyak kejadian yang akhirnya bikin bilang, “nah, gini dong.”',
  },

  {
    src: '/photos/photo-5.jpg',
    title: 'Main character',
    caption:
      'Sekali-sekali boleh lah menikmati momen dan ngerasa keren. Apalagi sekarang lagi ulang tahun.',
  },

  {
    src: '/photos/photo-6.jpg',
    title: 'Recharge',
    caption:
      'Istirahat yang cukup, makan yang enak, dan pulang dari liburan dengan energi yang penuh lagi.',
  },
]

/* =====================================================
   RANDOM WISH
===================================================== */

const RANDOM_WISHES = [
  'Semoga ada kabar baik yang datangnya justru pas lagi nggak ditunggu.',

  'Semoga tahun ini dompet aman, kepala tenang, badan sehat, dan jadwal nggak terlalu kejam.',

  'Semoga yang lagi kamu usahain sekarang akhirnya kasih hasil yang bikin lega.',

  'Semoga ketemu lebih banyak orang yang seru diajak jalan dan nggak bikin capek hati.',

  'Semoga lebih banyak ketawa daripada overthinking.',

  'Semoga ada perjalanan baru, makanan enak, dan cerita random yang nanti jadi bahan ketawa.',
]

/* =====================================================
   AMBIENT DOTS
===================================================== */

const FLOATING_DOTS =
  Array.from(
    { length: 32 },
    (_, index) => ({
      id: index,

      left: `${
        (index * 29 + 9) %
        100
      }%`,

      top: `${
        (index * 43 + 17) %
        100
      }%`,

      delay: `${
        -(index % 8) *
        0.8
      }s`,

      size: `${
        2 +
        (index % 4)
      }px`,
    }),
  )

/* =====================================================
   FIREWORKS
===================================================== */

const FIREWORKS = [
  {
    x: 10,
    y: 18,
    delay: 0.1,
    scale: 0.8,
  },

  {
    x: 28,
    y: 12,
    delay: 0.8,
    scale: 1,
  },

  {
    x: 50,
    y: 18,
    delay: 1.5,
    scale: 0.75,
  },

  {
    x: 71,
    y: 12,
    delay: 0.4,
    scale: 1.05,
  },

  {
    x: 90,
    y: 20,
    delay: 1.8,
    scale: 0.75,
  },

  {
    x: 17,
    y: 47,
    delay: 2.2,
    scale: 0.8,
  },

  {
    x: 83,
    y: 47,
    delay: 2.7,
    scale: 0.9,
  },
]

const SPARKS =
  Array.from(
    { length: 24 },
    (_, index) => ({
      id: index,
      angle:
        index * 15,
    }),
  )

const CONFETTI =
  Array.from(
    { length: 78 },
    (_, index) => {
      const colors = [
        '#ff3d9f',
        '#ff8bc2',
        '#ffffff',
        '#ffd27c',
        '#bd75ff',
      ]

      return {
        id: index,

        left:
          (index * 43 + 7) %
          100,

        delay:
          0.7 +
          (index % 12) *
            0.12,

        duration:
          3.4 +
          (index % 7) *
            0.35,

        drift:
          ((index % 5) -
            2) *
          32,

        rotation:
          540 +
          (index % 6) *
            120,

        color:
          colors[
            index %
              colors.length
          ],
      }
    },
  )

const STARS =
  Array.from(
    { length: 40 },
    (_, index) => ({
      id: index,

      left:
        (index * 37 + 11) %
        100,

      top:
        (index * 59 + 13) %
        100,

      delay:
        (index % 9) *
        0.15,

      duration:
        2 +
        (index % 5) *
          0.45,

      size:
        7 +
        (index % 5) *
          2,
    }),
  )

/* =====================================================
   APP
===================================================== */

function App() {
  const [
    entered,
    setEntered,
  ] = useState(false)

  const [
    isPlaying,
    setIsPlaying,
  ] = useState(false)

  const [
    messageOpen,
    setMessageOpen,
  ] = useState(false)

  const [
    galleryIndex,
    setGalleryIndex,
  ] = useState(0)

  const [
    activePhoto,
    setActivePhoto,
  ] = useState(null)

  const [
    holdProgress,
    setHoldProgress,
  ] = useState(0)

  const [
    celebrating,
    setCelebrating,
  ] = useState(false)

  const [
    wishIndex,
    setWishIndex,
  ] = useState(0)

  const [
    wishPulse,
    setWishPulse,
  ] = useState(false)

  /*
    IMPORTANT:
    AudioContext TIDAK ditutup setiap lagu berhenti.

    Ini penting terutama untuk Safari/iPhone
    dan production deployment.
  */

  const audioContextRef =
    useRef(null)

  const musicNodesRef =
    useRef([])

  const musicTimerRef =
    useRef(null)

  const audioKeeperRef =
    useRef(null)

  const holdTimerRef =
    useRef(null)

  const celebrationTimerRef =
    useRef(null)

  const wishTimerRef =
    useRef(null)

  const heroRef =
    useRef(null)

  const swipeStartRef =
    useRef(null)

  const currentPhoto =
    PHOTOS[galleryIndex]

  const currentWish =
    RANDOM_WISHES[
      wishIndex
    ]

  /* ===================================================
     GALLERY CALCULATION
  =================================================== */

  const galleryCards =
    useMemo(() => {
      return PHOTOS.map(
        (
          photo,
          index,
        ) => {
          let offset =
            index -
            galleryIndex

          const half =
            PHOTOS.length /
            2

          if (
            offset >
            half
          ) {
            offset -=
              PHOTOS.length
          }

          if (
            offset <
            -half
          ) {
            offset +=
              PHOTOS.length
          }

          return {
            photo,
            index,
            offset,
          }
        },
      )
    }, [galleryIndex])

  /* ===================================================
     AUDIO CONTEXT
  =================================================== */

  const getAudioContext =
    () => {
      const AudioCtx =
        window.AudioContext ||
        window.webkitAudioContext

      if (!AudioCtx) {
        return null
      }

      if (
        !audioContextRef.current ||
        audioContextRef
          .current
          .state ===
          'closed'
      ) {
        audioContextRef.current =
          new AudioCtx()
      }

      return (
        audioContextRef.current
      )
    }

  /*
    Dipanggil LANGSUNG dari click/pointerDown.

    Jangan menunggu sampai 100% untuk
    mengaktifkan AudioContext.
  */

  const unlockAudio =
    () => {
      const ctx =
        getAudioContext()

      if (!ctx) {
        return null
      }

      if (
        ctx.state ===
        'suspended'
      ) {
        ctx
          .resume()
          .catch(() => {})
      }

      /*
        Silent source kecil.

        Tujuannya membuat Safari / iOS
        menganggap audio sudah diaktifkan
        oleh gesture user.
      */

      try {
        const oscillator =
          ctx.createOscillator()

        const gain =
          ctx.createGain()

        gain.gain
          .setValueAtTime(
            0.00001,
            ctx.currentTime,
          )

        oscillator.frequency
          .setValueAtTime(
            220,
            ctx.currentTime,
          )

        oscillator.connect(
          gain,
        )

        gain.connect(
          ctx.destination,
        )

        oscillator.start()

        oscillator.stop(
          ctx.currentTime +
            0.05,
        )

        oscillator.onended =
          () => {
            try {
              oscillator.disconnect()
              gain.disconnect()
            } catch (_) {
              //
            }
          }
      } catch (_) {
        //
      }

      return ctx
    }

  /*
    Saat mulai tahan tombol,
    oscillator sangat pelan dibuat
    aktif selama beberapa detik.

    Progress 100% butuh ~1.4 detik,
    jadi context tetap running sampai
    musik mulai.
  */

  const armAudioForHold =
    () => {
      const ctx =
        unlockAudio()

      if (!ctx) return

      try {
        if (
          audioKeeperRef
            .current
        ) {
          audioKeeperRef
            .current
            .oscillator
            ?.stop()
        }
      } catch (_) {
        //
      }

      const oscillator =
        ctx.createOscillator()

      const gain =
        ctx.createGain()

      oscillator.type =
        'sine'

      oscillator.frequency
        .setValueAtTime(
          160,
          ctx.currentTime,
        )

      gain.gain
        .setValueAtTime(
          0.00001,
          ctx.currentTime,
        )

      oscillator.connect(
        gain,
      )

      gain.connect(
        ctx.destination,
      )

      oscillator.start()

      oscillator.stop(
        ctx.currentTime +
          3,
      )

      audioKeeperRef.current =
        {
          oscillator,
          gain,
        }

      oscillator.onended =
        () => {
          try {
            oscillator.disconnect()
            gain.disconnect()
          } catch (_) {
            //
          }

          if (
            audioKeeperRef
              .current
              ?.oscillator ===
            oscillator
          ) {
            audioKeeperRef.current =
              null
          }
        }
    }

  const stopAudioKeeper =
    () => {
      const keeper =
        audioKeeperRef.current

      if (!keeper) return

      try {
        keeper.oscillator
          .stop()
      } catch (_) {
        //
      }

      try {
        keeper.oscillator
          .disconnect()

        keeper.gain
          .disconnect()
      } catch (_) {
        //
      }

      audioKeeperRef.current =
        null
    }

  /* ===================================================
     STOP CURRENT SONG
  =================================================== */

  const stopMusic = () => {
    if (
      musicTimerRef.current
    ) {
      clearTimeout(
        musicTimerRef.current,
      )

      musicTimerRef.current =
        null
    }

    musicNodesRef.current
      .forEach(
        (node) => {
          try {
            if (
              typeof node.stop ===
              'function'
            ) {
              node.stop()
            }
          } catch (_) {
            //
          }

          try {
            if (
              typeof node.disconnect ===
              'function'
            ) {
              node.disconnect()
            }
          } catch (_) {
            //
          }
        },
      )

    musicNodesRef.current =
      []

    /*
      JANGAN:
      audioContextRef.current.close()

      Karena setelah production,
      browser mobile bisa memblokir
      AudioContext baru.
    */

    setIsPlaying(false)
  }

  /* ===================================================
     SOFT WARM NOTE
  =================================================== */

  const createSoftNote = ({
    ctx,
    frequency,
    start,
    duration,
    volume,
    destination,
  }) => {
    const main =
      ctx.createOscillator()

    const warm =
      ctx.createOscillator()

    const gain =
      ctx.createGain()

    const warmGain =
      ctx.createGain()

    const filter =
      ctx.createBiquadFilter()

    main.type = 'sine'

    warm.type =
      'triangle'

    main.frequency
      .setValueAtTime(
        frequency,
        start,
      )

    warm.frequency
      .setValueAtTime(
        frequency * 2,
        start,
      )

    /*
      sedikit detune supaya tidak
      terdengar seperti ringtone.
    */

    main.detune
      .setValueAtTime(
        -2,
        start,
      )

    warm.detune
      .setValueAtTime(
        3,
        start,
      )

    filter.type =
      'lowpass'

    filter.frequency
      .setValueAtTime(
        1350,
        start,
      )

    filter.Q.value =
      0.45

    gain.gain
      .setValueAtTime(
        0.0001,
        start,
      )

    gain.gain
      .exponentialRampToValueAtTime(
        volume,
        start + 0.065,
      )

    gain.gain
      .setValueAtTime(
        volume * 0.75,
        start +
          duration *
            0.5,
      )

    gain.gain
      .exponentialRampToValueAtTime(
        0.0001,
        start +
          duration +
          0.3,
      )

    warmGain.gain
      .setValueAtTime(
        0.0001,
        start,
      )

    warmGain.gain
      .exponentialRampToValueAtTime(
        volume * 0.07,
        start + 0.1,
      )

    warmGain.gain
      .exponentialRampToValueAtTime(
        0.0001,
        start +
          duration +
          0.2,
      )

    main.connect(
      filter,
    )

    filter.connect(
      gain,
    )

    gain.connect(
      destination,
    )

    warm.connect(
      warmGain,
    )

    warmGain.connect(
      destination,
    )

    main.start(start)

    warm.start(start)

    main.stop(
      start +
        duration +
        0.35,
    )

    warm.stop(
      start +
        duration +
        0.25,
    )

    musicNodesRef.current.push(
      main,
      warm,
      gain,
      warmGain,
      filter,
    )
  }

  /* ===================================================
     SOFT CHORD PAD
  =================================================== */

  const createWarmChord = ({
    ctx,
    notes,
    start,
    duration,
    destination,
  }) => {
    notes.forEach(
      (
        note,
        index,
      ) => {
        const oscillator =
          ctx.createOscillator()

        const gain =
          ctx.createGain()

        const filter =
          ctx.createBiquadFilter()

        oscillator.type =
          index === 0
            ? 'sine'
            : 'triangle'

        oscillator.frequency
          .setValueAtTime(
            NOTES[note],
            start,
          )

        oscillator.detune
          .setValueAtTime(
            index === 0
              ? -3
              : 2,
            start,
          )

        filter.type =
          'lowpass'

        filter.frequency
          .setValueAtTime(
            600,
            start,
          )

        gain.gain
          .setValueAtTime(
            0.0001,
            start,
          )

        gain.gain
          .exponentialRampToValueAtTime(
            index === 0
              ? 0.014
              : 0.008,
            start + 0.4,
          )

        gain.gain
          .setValueAtTime(
            index === 0
              ? 0.011
              : 0.006,
            start +
              duration *
                0.55,
          )

        gain.gain
          .exponentialRampToValueAtTime(
            0.0001,
            start +
              duration,
          )

        oscillator.connect(
          filter,
        )

        filter.connect(
          gain,
        )

        gain.connect(
          destination,
        )

        oscillator.start(
          start,
        )

        oscillator.stop(
          start +
            duration +
            0.1,
        )

        musicNodesRef.current.push(
          oscillator,
          gain,
          filter,
        )
      },
    )
  }

  /* ===================================================
     SOFT BASS
  =================================================== */

  const createSoftBass = ({
    ctx,
    note,
    start,
    duration,
    destination,
  }) => {
    const oscillator =
      ctx.createOscillator()

    const gain =
      ctx.createGain()

    const filter =
      ctx.createBiquadFilter()

    oscillator.type =
      'sine'

    oscillator.frequency
      .setValueAtTime(
        NOTES[note],
        start,
      )

    filter.type =
      'lowpass'

    filter.frequency
      .setValueAtTime(
        230,
        start,
      )

    gain.gain
      .setValueAtTime(
        0.0001,
        start,
      )

    gain.gain
      .exponentialRampToValueAtTime(
        0.012,
        start + 0.28,
      )

    gain.gain
      .exponentialRampToValueAtTime(
        0.0001,
        start +
          duration,
      )

    oscillator.connect(
      filter,
    )

    filter.connect(
      gain,
    )

    gain.connect(
      destination,
    )

    oscillator.start(start)

    oscillator.stop(
      start +
        duration +
        0.1,
    )

    musicNodesRef.current.push(
      oscillator,
      gain,
      filter,
    )
  }

  /* ===================================================
     PLAY HAPPY BIRTHDAY
  =================================================== */

  const playMusic = () => {
    stopMusic()

    const ctx =
      getAudioContext()

    if (!ctx) return

    /*
      Karena context sudah di-unlock saat
      pointerDown, biasanya state sudah
      "running" ketika progress 100%.
    */

    if (
      ctx.state ===
      'suspended'
    ) {
      ctx
        .resume()
        .catch(() => {})
    }

    const master =
      ctx.createGain()

    const compressor =
      ctx.createDynamicsCompressor()

    const delay =
      ctx.createDelay(1)

    const feedback =
      ctx.createGain()

    const wet =
      ctx.createGain()

    master.gain
      .setValueAtTime(
        0.0001,
        ctx.currentTime,
      )

    /*
      Soft fade-in.
    */

    master.gain
      .exponentialRampToValueAtTime(
        0.68,
        ctx.currentTime +
          0.8,
      )

    compressor.threshold.value =
      -25

    compressor.knee.value =
      28

    compressor.ratio.value =
      3

    compressor.attack.value =
      0.025

    compressor.release.value =
      0.6

    /*
      Very light echo saja.
      Tidak dibuat terlalu besar
      supaya tidak terasa creepy.
    */

    delay.delayTime.value =
      0.21

    feedback.gain.value =
      0.08

    wet.gain.value =
      0.055

    master.connect(
      compressor,
    )

    master.connect(
      delay,
    )

    delay.connect(
      feedback,
    )

    feedback.connect(
      delay,
    )

    delay.connect(
      wet,
    )

    wet.connect(
      compressor,
    )

    compressor.connect(
      ctx.destination,
    )

    musicNodesRef.current.push(
      master,
      compressor,
      delay,
      feedback,
      wet,
    )

    /*
      Beri 80 ms agar masuk
      dengan halus.
    */

    let cursor =
      ctx.currentTime +
      0.08

    const songStart =
      cursor

    const chordLength =
      3.55

    /*
      Chord background.
    */

    CHORDS.forEach(
      (
        chord,
        index,
      ) => {
        const start =
          songStart +
          index *
            chordLength

        createWarmChord({
          ctx,

          notes:
            chord,

          start,

          duration:
            chordLength +
            0.4,

          destination:
            master,
        })

        createSoftBass({
          ctx,

          note:
            BASS_NOTES[
              index
            ],

          start,

          duration:
            chordLength,

          destination:
            master,
        })
      },
    )

    /*
      Main Happy Birthday melody.
    */

    MELODY.forEach(
      (
        [
          note,
          duration,
        ],
      ) => {
        createSoftNote({
          ctx,

          frequency:
            NOTES[note],

          start:
            cursor,

          duration,

          volume:
            0.057,

          destination:
            master,
        })

        cursor +=
          duration +
          0.075
      },
    )

    const ending =
      cursor +
      0.8

    /*
      Fade-out terakhir.
    */

    master.gain
      .setValueAtTime(
        0.68,
        Math.max(
          ctx.currentTime +
            0.8,

          ending -
            1.7,
        ),
      )

    master.gain
      .exponentialRampToValueAtTime(
        0.0001,
        ending,
      )

    setIsPlaying(true)

    musicTimerRef.current =
      setTimeout(
        () => {
          setIsPlaying(
            false,
          )

          musicTimerRef.current =
            null
        },
        SONG_DURATION_MS,
      )
  }

  /* ===================================================
     SITE ENTRY
  =================================================== */

  const enterSite =
    () => {
      /*
        Ini user gesture pertama,
        langsung unlock audio.
      */

      unlockAudio()

      setEntered(true)
    }

  /* ===================================================
     MUSIC BUTTON
  =================================================== */

  const toggleMusic =
    () => {
      unlockAudio()

      if (isPlaying) {
        stopMusic()
      } else {
        playMusic()
      }
    }

  /* ===================================================
     GALLERY
  =================================================== */

  const nextPhoto =
    () => {
      setGalleryIndex(
        (index) =>
          (index + 1) %
          PHOTOS.length,
      )
    }

  const previousPhoto =
    () => {
      setGalleryIndex(
        (index) =>
          (index -
            1 +
            PHOTOS.length) %
          PHOTOS.length,
      )
    }

  const handleGalleryDown =
    (event) => {
      swipeStartRef.current =
        event.clientX
    }

  const handleGalleryUp =
    (event) => {
      if (
        swipeStartRef.current ===
        null
      ) {
        return
      }

      const distance =
        event.clientX -
        swipeStartRef.current

      swipeStartRef.current =
        null

      if (
        Math.abs(
          distance,
        ) < 45
      ) {
        return
      }

      if (
        distance < 0
      ) {
        nextPhoto()
      } else {
        previousPhoto()
      }
    }

  /* ===================================================
     RANDOM WISH
  =================================================== */

  const shuffleWish =
    () => {
      setWishPulse(
        false,
      )

      setWishIndex(
        (index) => {
          let next =
            index

          while (
            next ===
            index
          ) {
            next =
              Math.floor(
                Math.random() *
                  RANDOM_WISHES.length,
              )
          }

          return next
        },
      )

      requestAnimationFrame(
        () => {
          setWishPulse(
            true,
          )
        },
      )

      if (
        wishTimerRef.current
      ) {
        clearTimeout(
          wishTimerRef.current,
        )
      }

      wishTimerRef.current =
        setTimeout(
          () => {
            setWishPulse(
              false,
            )
          },
          650,
        )
    }

  /* ===================================================
     CELEBRATION
  =================================================== */

  const triggerCelebration =
    () => {
      if (
        celebrationTimerRef.current
      ) {
        clearTimeout(
          celebrationTimerRef.current,
        )
      }

      /*
        Musik langsung start dari
        AudioContext yang sudah running.
      */

      playMusic()

      /*
        Restart animation kalau
        ditekan lagi.
      */

      setCelebrating(false)

      requestAnimationFrame(
        () => {
          requestAnimationFrame(
            () => {
              setCelebrating(
                true,
              )
            },
          )
        },
      )

      setHoldProgress(
        100,
      )

      celebrationTimerRef.current =
        setTimeout(
          () => {
            setCelebrating(
              false,
            )

            celebrationTimerRef.current =
              null
          },
          SONG_DURATION_MS,
        )
    }

  /* ===================================================
     HOLD BUTTON
  =================================================== */

  const startHold =
    () => {
      /*
        SUPER IMPORTANT.

        Dipanggil langsung saat pointerDown,
        bukan setelah progress selesai.

        Ini fix utama suara production.
      */

      armAudioForHold()

      if (
        holdProgress >=
        100
      ) {
        triggerCelebration()

        return
      }

      clearInterval(
        holdTimerRef.current,
      )

      holdTimerRef.current =
        setInterval(
          () => {
            setHoldProgress(
              (progress) => {
                const next =
                  Math.min(
                    progress +
                      4,
                    100,
                  )

                if (
                  next >=
                  100
                ) {
                  clearInterval(
                    holdTimerRef.current,
                  )

                  holdTimerRef.current =
                    null

                  /*
                    Context sudah aktif karena
                    armAudioForHold dijalankan
                    sejak pointerDown.
                  */

                  setTimeout(
                    () => {
                      triggerCelebration()
                    },
                    30,
                  )
                }

                return next
              },
            )
          },
          55,
        )
    }

  const stopHold =
    () => {
      clearInterval(
        holdTimerRef.current,
      )

      holdTimerRef.current =
        null

      stopAudioKeeper()

      setHoldProgress(
        (progress) =>
          progress >= 100
            ? 100
            : 0,
      )
    }

  /* ===================================================
     CURSOR
  =================================================== */

  const handlePointerMove =
    (event) => {
      document
        .documentElement
        .style
        .setProperty(
          '--mx',
          `${event.clientX}px`,
        )

      document
        .documentElement
        .style
        .setProperty(
          '--my',
          `${event.clientY}px`,
        )

      if (
        !heroRef.current ||
        window
          .matchMedia(
            '(max-width: 760px)',
          )
          .matches
      ) {
        return
      }

      const rect =
        heroRef.current
          .getBoundingClientRect()

      const x =
        (event.clientX -
          rect.left) /
          rect.width -
        0.5

      const y =
        (event.clientY -
          rect.top) /
          rect.height -
        0.5

      heroRef.current
        .style
        .setProperty(
          '--rx',
          `${
            y * -3.5
          }deg`,
        )

      heroRef.current
        .style
        .setProperty(
          '--ry',
          `${
            x * 4.5
          }deg`,
        )
    }

  const resetTilt =
    () => {
      if (
        !heroRef.current
      ) {
        return
      }

      heroRef.current
        .style
        .setProperty(
          '--rx',
          '0deg',
        )

      heroRef.current
        .style
        .setProperty(
          '--ry',
          '0deg',
        )
    }

  /* ===================================================
     CLEAN UP
  =================================================== */

  useEffect(() => {
    return () => {
      clearInterval(
        holdTimerRef.current,
      )

      clearTimeout(
        musicTimerRef.current,
      )

      clearTimeout(
        celebrationTimerRef.current,
      )

      clearTimeout(
        wishTimerRef.current,
      )

      stopAudioKeeper()

      musicNodesRef.current
        .forEach(
          (node) => {
            try {
              if (
                typeof node.stop ===
                'function'
              ) {
                node.stop()
              }
            } catch (_) {
              //
            }
          },
        )

      /*
        Context hanya ditutup ketika
        halaman benar-benar unmount.
      */

      if (
        audioContextRef.current &&
        audioContextRef
          .current
          .state !==
          'closed'
      ) {
        audioContextRef
          .current
          .close()
          .catch(
            () => {},
          )
      }
    }
  }, [])

  /* ===================================================
     UI
  =================================================== */

  return (
    <main
      className="app"
      onPointerMove={
        handlePointerMove
      }
    >
      {/* BACKGROUND */}

      <div
        className="cursor-aura"
        aria-hidden="true"
      />

      <div
        className="page-grid"
        aria-hidden="true"
      />

      <div
        className="noise-layer"
        aria-hidden="true"
      />

      <div
        className="ambient ambient-one"
        aria-hidden="true"
      />

      <div
        className="ambient ambient-two"
        aria-hidden="true"
      />

      <div className="floating-dots">
        {FLOATING_DOTS.map(
          (dot) => (
            <span
              key={
                dot.id
              }
              style={{
                left:
                  dot.left,

                top:
                  dot.top,

                width:
                  dot.size,

                height:
                  dot.size,

                animationDelay:
                  dot.delay,
              }}
            />
          ),
        )}
      </div>

      {/* ===============================================
          INTRO
      =============================================== */}

      {!entered && (
        <section className="intro-screen">
          <div className="intro-card">
            <div className="intro-orbit">
              <span>
                R
              </span>
            </div>

            <p className="eyebrow">
              BIRTHDAY · SPECIAL DROP
            </p>

            <h1>
              Ini buat{' '}
              <span>
                Rizki.
              </span>
            </h1>

            <p className="intro-copy">
              Nggak
              panjang-panjang.
              Cuma sesuatu kecil
              yang dibikin khusus
              buat hari ini.
            </p>

            <button
              className="primary-btn"
              onClick={
                enterSite
              }
            >
              Buka dulu

              <ChevronRight
                size={18}
              />
            </button>

            <p className="tiny-note">
              sound on recommended
            </p>
          </div>
        </section>
      )}

      {/* ===============================================
          BIRTHDAY CELEBRATION
      =============================================== */}

      {celebrating && (
        <div
          className="birthday-celebration"
          style={{
            '--celebration-duration':
              '17.4s',
          }}
        >
          <div className="birthday-darken" />

          <div className="birthday-aurora" />

          {/* STARS */}

          <div className="birthday-stars">
            {STARS.map(
              (star) => (
                <span
                  key={
                    star.id
                  }
                  style={{
                    left: `${star.left}%`,

                    top: `${star.top}%`,

                    fontSize: `${star.size}px`,

                    animationDelay: `${star.delay}s`,

                    animationDuration: `${star.duration}s`,
                  }}
                >
                  ✦
                </span>
              ),
            )}
          </div>

          {/* FIREWORKS */}

          <div className="fireworks-wrap">
            {FIREWORKS.map(
              (
                firework,
                index,
              ) => (
                <div
                  key={
                    index
                  }
                  className="firework"
                  style={{
                    left: `${firework.x}%`,

                    top: `${firework.y}%`,

                    '--firework-delay': `${firework.delay}s`,

                    '--firework-scale':
                      firework.scale,
                  }}
                >
                  <span className="firework-center" />

                  {SPARKS.map(
                    (
                      spark,
                    ) => (
                      <span
                        key={
                          spark.id
                        }
                        className="firework-spark"
                        style={{
                          '--angle': `${spark.angle}deg`,
                        }}
                      />
                    ),
                  )}
                </div>
              ),
            )}
          </div>

          {/* MAIN TEXT */}

          <div className="birthday-copy">
            <p className="birthday-kicker">
              YOUR DAY · YOUR MOMENT
            </p>

            <h2>
              <span className="happy-text">
                HAPPY
              </span>

              <span className="birthday-text">
                BIRTHDAY
              </span>

              <strong>
                RIZKI!
              </strong>
            </h2>

            <div className="birthday-divider" />

            <p className="birthday-main-message">
              Semoga banyak hal
              baik datang di umur
              yang baru ini.
            </p>

            <p className="birthday-sub-message">
              Have fun, nikmatin
              liburannya, dan
              pulang bawa cerita
              yang seru.
            </p>

            <div className="birthday-heart">
              <Heart
                size={20}
                fill="currentColor"
              />
            </div>
          </div>

          {/* CONFETTI */}

          <div className="celebration-confetti">
            {CONFETTI.map(
              (piece) => (
                <span
                  key={
                    piece.id
                  }
                  style={{
                    left: `${piece.left}%`,

                    background:
                      piece.color,

                    animationDelay: `${piece.delay}s`,

                    animationDuration: `${piece.duration}s`,

                    '--drift': `${piece.drift}px`,

                    '--rotation': `${piece.rotation}deg`,
                  }}
                />
              ),
            )}
          </div>
        </div>
      )}

      {/* ===============================================
          NAV
      =============================================== */}

      <nav className="nav-wrap">
        <a
          className="logo"
          href="#top"
        >
          R<span>.</span>
        </a>

        <p>
          MUHAMMAD RIZKI ADITYA
        </p>

        <button
          className="music-button"
          onClick={
            toggleMusic
          }
        >
          {isPlaying ? (
            <Pause
              size={16}
            />
          ) : (
            <Volume2
              size={16}
            />
          )}

          <span>
            {isPlaying
              ? 'Pause'
              : 'Music'}
          </span>
        </button>
      </nav>

      {/* ===============================================
          HERO
      =============================================== */}

      <section
        className="hero"
        id="top"
      >
        <div
          className="hero-card"
          ref={
            heroRef
          }
          onPointerLeave={
            resetTilt
          }
        >
          <div className="hero-index">
            01
          </div>

          <div className="hero-copy">
            <p className="eyebrow pink">
              HARI INI PUNYA KAMU
            </p>

            <h1>
              Happy Birthday,

              <span>
                Muhammad Rizki
                Aditya.
              </span>
            </h1>

            <p className="hero-description">
              Semoga umur barunya
              enak dijalanin:
              kerjaan nggak terlalu
              bikin pusing, rezeki
              makin lancar, badan
              sehat, dan ada lebih
              banyak waktu buat
              hal-hal yang emang
              bikin senang.
            </p>

            <div className="hero-actions">
              <button
                className="primary-btn"
                onClick={() =>
                  document
                    .getElementById(
                      'message',
                    )
                    ?.scrollIntoView({
                      behavior:
                        'smooth',
                    })
                }
              >
                Ada pesan buat kamu

                <ArrowDown
                  size={17}
                />
              </button>

              <button
                className="secondary-btn"
                onClick={
                  toggleMusic
                }
              >
                {isPlaying ? (
                  <Pause
                    size={17}
                  />
                ) : (
                  <Music2
                    size={17}
                  />
                )}

                {isPlaying
                  ? 'Stop lagu'
                  : 'Putar lagu'}
              </button>
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-circle outer" />

            <div className="hero-circle inner" />

            <div className="hero-r">
              R
            </div>

            <span className="hero-chip chip-one">
              good energy only
            </span>

            <span className="hero-chip chip-two">
              birthday mode
            </span>
          </div>
        </div>
      </section>

      {/* ===============================================
          MESSAGE
      =============================================== */}

      <section
        className="section"
        id="message"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              02 · PRIVATE NOTE
            </p>

            <h2>
              Pesan kecil.
              <br />

              <span>
                Yang ini khusus
                buat kamu.
              </span>
            </h2>
          </div>
        </div>

        <div
          className={`message-box ${
            messageOpen
              ? 'open'
              : ''
          }`}
        >
          <div className="message-light" />

          <div className="message-header">
            <div className="message-header-left">
              <div className="mail-icon">
                {messageOpen ? (
                  <MailOpen
                    size={19}
                  />
                ) : (
                  <Mail
                    size={19}
                  />
                )}
              </div>

              <div>
                <span>
                  PRIVATE MESSAGE
                </span>

                <p>
                  For Muhammad Rizki
                  Aditya
                </p>
              </div>
            </div>

            <span className="message-status">
              {messageOpen
                ? 'OPENED'
                : 'SEALED'}
            </span>
          </div>

          <div className="message-divider" />

          <div className="message-body-wrap">
            <div className="message-cover">
              <div className="cover-ring">
                <span>
                  R
                </span>
              </div>

              <p>
                Ada sedikit ucapan
                yang sengaja
                disimpan di sini.
              </p>
            </div>

            <article className="message-letter">
              <p className="message-dear">
                Dear Rizki,
              </p>

              <h3>
                Happy birthday.
              </h3>

              <p>
                Semoga tahun ini
                hidup kamu terasa
                lebih ringan. Yang
                lagi dikejar semoga
                ketemu jalannya,
                yang lagi dipikirin
                semoga cepat kelar,
                dan yang bikin
                capek semoga nggak
                betah lama-lama.
              </p>

              <p>
                Tetap jadi orang
                yang seru diajak
                ngobrol, tetap
                punya waktu buat
                diri sendiri, dan
                jangan lupa
                nikmatin yang
                sekarang. Nggak
                semua hal harus
                langsung jadi besar
                buat bisa dianggap
                progress.
              </p>

              <p>
                Mumpung lagi
                liburan, have fun
                yang bener. Jalan,
                makan enak,
                foto-foto, tidur
                cukup, terus pulang
                dengan kepala yang
                lebih enteng. Nanti
                urusan sibuk bisa
                dilanjutin lagi.
              </p>

              <div className="special-line">
                <span>
                  PS.
                </span>

                <p>
                  Kapan makan
                  masakanmu lagi?
                </p>
              </div>

              <p className="message-sign">
                Enjoy the day.
                Jangan lupa
                senang-senang.
              </p>
            </article>
          </div>

          <div className="message-footer">
            <button
              className={
                messageOpen
                  ? 'close-message-button'
                  : 'open-message-button'
              }
              onClick={() =>
                setMessageOpen(
                  (value) =>
                    !value,
                )
              }
            >
              {messageOpen ? (
                <>
                  <X
                    size={17}
                  />

                  Tutup Pesan
                </>
              ) : (
                <>
                  <MailOpen
                    size={17}
                  />

                  Buka Pesan
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ===============================================
          GALLERY
      =============================================== */}

      <section className="section">
        <div className="section-heading gallery-heading">
          <div>
            <p className="eyebrow">
              03 · LITTLE MOMENTS
            </p>

            <h2>
              Rizki’s
              <br />

              <span>
                Little Gallery.
              </span>
            </h2>
          </div>

          <p className="gallery-intro">
            Beberapa potret buat
            nyimpen sedikit cerita,
            mood, dan momen di
            halaman ini.
          </p>
        </div>

        <div
          className="gallery-stage"
          onPointerDown={
            handleGalleryDown
          }
          onPointerUp={
            handleGalleryUp
          }
          onPointerCancel={() => {
            swipeStartRef.current =
              null
          }}
        >
          <button
            className="gallery-arrow left"
            onClick={
              previousPhoto
            }
          >
            <ChevronLeft />
          </button>

          <div className="photo-deck">
            {galleryCards.map(
              ({
                photo,
                index,
                offset,
              }) => {
                const distance =
                  Math.abs(
                    offset,
                  )

                const visible =
                  distance <= 2

                const x =
                  offset * 58

                const y =
                  distance *
                  18

                const scale =
                  Math.max(
                    0.78,

                    1 -
                      distance *
                        0.09,
                  )

                const rotate =
                  offset *
                  4.5

                return (
                  <button
                    key={
                      photo.src
                    }
                    className={`photo-card ${
                      offset ===
                      0
                        ? 'active'
                        : ''
                    }`}
                    style={{
                      transform: `translate3d(${x}%, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`,

                      zIndex:
                        20 -
                        distance,

                      opacity:
                        visible
                          ? 1
                          : 0,

                      pointerEvents:
                        offset ===
                        0
                          ? 'auto'
                          : 'none',
                    }}
                    onClick={() =>
                      setActivePhoto(
                        index,
                      )
                    }
                  >
                    <img
                      src={
                        photo.src
                      }
                      alt={
                        photo.title
                      }
                      draggable={
                        false
                      }
                    />

                    <div className="photo-shade" />

                    <div className="photo-copy">
                      <span>
                        {String(
                          index +
                            1,
                        ).padStart(
                          2,
                          '0',
                        )}

                        {' / '}

                        {String(
                          PHOTOS.length,
                        ).padStart(
                          2,
                          '0',
                        )}
                      </span>

                      <h3>
                        {
                          photo.title
                        }
                      </h3>

                      <p>
                        {
                          photo.caption
                        }
                      </p>
                    </div>
                  </button>
                )
              },
            )}
          </div>

          <button
            className="gallery-arrow right"
            onClick={
              nextPhoto
            }
          >
            <ChevronRight />
          </button>
        </div>

        <div className="gallery-footer">
          <div className="gallery-dots">
            {PHOTOS.map(
              (
                photo,
                index,
              ) => (
                <button
                  key={
                    photo.src
                  }
                  className={
                    index ===
                    galleryIndex
                      ? 'active'
                      : ''
                  }
                  onClick={() =>
                    setGalleryIndex(
                      index,
                    )
                  }
                />
              ),
            )}
          </div>

          <div className="gallery-current">
            <Camera
              size={16}
            />

            {
              currentPhoto.title
            }
          </div>
        </div>
      </section>

      {/* ===============================================
          RANDOM WISH
      =============================================== */}

      <section className="section">
        <div className="wish-box">
          <div className="wish-decoration">
            <Sparkles
              size={52}
            />
          </div>

          <p className="eyebrow">
            04 · RANDOM WISH
          </p>

          <h2>
            Ambil satu wish
            <br />

            <span>
              buat tahun ini.
            </span>
          </h2>

          <div
            className={`wish-result ${
              wishPulse
                ? 'pulse'
                : ''
            }`}
          >
            <span>
              ✦
            </span>

            <p>
              {currentWish}
            </p>
          </div>

          <button
            className="secondary-btn"
            onClick={
              shuffleWish
            }
          >
            <RotateCcw
              size={17}
            />

            Acak lagi
          </button>
        </div>
      </section>

      {/* ===============================================
          FINAL HOLD
      =============================================== */}

      <section className="section">
        <div className="final-card">
          <div className="final-copy">
            <div className="cake-icon">
              <CakeSlice
                size={22}
              />
            </div>

            <p className="eyebrow">
              05 · MAKE A WISH
            </p>

            <h2>
              Terakhir.
              <br />

              <span>
                Tekan, jangan cuma
                klik.
              </span>
            </h2>

            <p>
              Tekan dan tahan
              sampai penuh. Begitu
              100%, tunggu sebentar
              dan nikmatin
              momennya.
            </p>
          </div>

          <button
            className={`hold-button ${
              holdProgress >=
              100
                ? 'complete'
                : ''
            }`}

            /*
              startHold dipanggil LANGSUNG
              oleh pointerDown.

              Di dalam startHold ada
              armAudioForHold().
            */

            onPointerDown={
              startHold
            }

            onPointerUp={
              stopHold
            }

            onPointerLeave={
              stopHold
            }

            onPointerCancel={
              stopHold
            }

            onKeyDown={
              (event) => {
                if (
                  (
                    event.key ===
                      'Enter' ||
                    event.key ===
                      ' '
                  ) &&
                  !event.repeat
                ) {
                  startHold()
                }
              }
            }

            onKeyUp={
              (event) => {
                if (
                  event.key ===
                    'Enter' ||
                  event.key ===
                    ' '
                ) {
                  stopHold()
                }
              }
            }
          >
            <span
              className="hold-progress"
              style={{
                width: `${holdProgress}%`,
              }}
            />

            <span className="hold-label">
              <Gift
                size={20}
              />

              {holdProgress >=
              100
                ? 'Wish unlocked — tekan lagi kalau mau ulang'
                : 'Tekan & tahan di sini'}
            </span>

            <span className="hold-percent">
              {Math.round(
                holdProgress,
              )}
              %
            </span>
          </button>
        </div>
      </section>

      {/* FOOTER */}

      <footer>
        <div>
          <span>
            R.
          </span>

          Made for Muhammad
          Rizki Aditya
        </div>

        <p>
          have fun on your
          holiday.
        </p>
      </footer>

      {/* ===============================================
          PHOTO MODAL
      =============================================== */}

      {activePhoto !==
        null && (
        <div
          className="modal-backdrop"
          onClick={() =>
            setActivePhoto(
              null,
            )
          }
        >
          <div
            className="photo-modal"
            onClick={(
              event,
            ) =>
              event.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={() =>
                setActivePhoto(
                  null,
                )
              }
            >
              <X
                size={18}
              />
            </button>

            <img
              src={
                PHOTOS[
                  activePhoto
                ].src
              }
              alt={
                PHOTOS[
                  activePhoto
                ].title
              }
            />

            <div className="modal-content">
              <p className="eyebrow">
                PHOTO{' '}
                {String(
                  activePhoto +
                    1,
                ).padStart(
                  2,
                  '0',
                )}
              </p>

              <h3>
                {
                  PHOTOS[
                    activePhoto
                  ].title
                }
              </h3>

              <p>
                {
                  PHOTOS[
                    activePhoto
                  ].caption
                }
              </p>

              <div className="modal-navigation">
                <button
                  onClick={() =>
                    setActivePhoto(
                      (
                        activePhoto -
                        1 +
                        PHOTOS.length
                      ) %
                        PHOTOS.length,
                    )
                  }
                >
                  <ChevronLeft
                    size={18}
                  />
                </button>

                <span>
                  {activePhoto +
                    1}{' '}
                  /{' '}
                  {
                    PHOTOS.length
                  }
                </span>

                <button
                  onClick={() =>
                    setActivePhoto(
                      (
                        activePhoto +
                        1
                      ) %
                        PHOTOS.length,
                    )
                  }
                >
                  <ChevronRight
                    size={18}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default App