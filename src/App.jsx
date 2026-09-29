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
   MUSIC
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
  Panjang lagu kira-kira 17 detik.
  Celebration dipertahankan sedikit
  lebih lama agar fade terakhir halus.
*/

const SONG_DURATION_MS = 17500

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
   BACKGROUND PARTICLES
===================================================== */

const FLOATING_DOTS = Array.from(
  { length: 32 },
  (_, index) => ({
    id: index,

    left: `${
      (index * 29 + 9) % 100
    }%`,

    top: `${
      (index * 43 + 17) % 100
    }%`,

    delay: `${
      -(index % 8) * 0.8
    }s`,

    size: `${
      2 + (index % 4)
    }px`,
  }),
)

/* =====================================================
   FIREWORKS
===================================================== */

const FIREWORKS = [
  {
    x: 10,
    y: 19,
    delay: 0.1,
    scale: 0.75,
  },

  {
    x: 28,
    y: 12,
    delay: 0.7,
    scale: 1,
  },

  {
    x: 51,
    y: 19,
    delay: 1.3,
    scale: 0.82,
  },

  {
    x: 72,
    y: 13,
    delay: 0.35,
    scale: 1.05,
  },

  {
    x: 90,
    y: 22,
    delay: 1.7,
    scale: 0.78,
  },

  {
    x: 16,
    y: 48,
    delay: 2.1,
    scale: 0.8,
  },

  {
    x: 83,
    y: 48,
    delay: 2.5,
    scale: 0.88,
  },
]

const SPARKS = Array.from(
  { length: 24 },
  (_, i) => i,
)

const CONFETTI = Array.from(
  { length: 74 },
  (_, i) => i,
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

  const audioContextRef =
    useRef(null)

  const audioNodesRef =
    useRef([])

  const timersRef =
    useRef([])

  const holdTimerRef =
    useRef(null)

  const heroRef =
    useRef(null)

  const swipeStartRef =
    useRef(null)

  const currentPhoto =
    PHOTOS[galleryIndex]

  const currentWish =
    RANDOM_WISHES[wishIndex]

  /* ===================================================
     GALLERY POSITION
  =================================================== */

  const galleryCards =
    useMemo(() => {
      return PHOTOS.map(
        (photo, index) => {
          let offset =
            index -
            galleryIndex

          const half =
            PHOTOS.length / 2

          if (
            offset > half
          ) {
            offset -=
              PHOTOS.length
          }

          if (
            offset < -half
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
     STOP MUSIC
  =================================================== */

  const stopMusic = () => {
    audioNodesRef.current.forEach(
      (node) => {
        try {
          if (
            typeof node.stop ===
            'function'
          ) {
            node.stop()
          }

          if (
            typeof node.disconnect ===
            'function'
          ) {
            node.disconnect()
          }
        } catch (_) {
          // ignored
        }
      },
    )

    audioNodesRef.current = []

    if (
      audioContextRef.current
    ) {
      audioContextRef.current
        .close()
        .catch(() => {})

      audioContextRef.current =
        null
    }

    setIsPlaying(false)
  }

  /* ===================================================
     SOFT NOTE
  =================================================== */

  const createSoftNote = ({
    ctx,
    frequency,
    start,
    duration,
    volume,
    output,
  }) => {
    const osc =
      ctx.createOscillator()

    const harmonic =
      ctx.createOscillator()

    const gain =
      ctx.createGain()

    const harmonicGain =
      ctx.createGain()

    const filter =
      ctx.createBiquadFilter()

    osc.type = 'sine'

    harmonic.type =
      'triangle'

    osc.frequency.setValueAtTime(
      frequency,
      start,
    )

    harmonic.frequency.setValueAtTime(
      frequency * 2,
      start,
    )

    filter.type =
      'lowpass'

    filter.frequency.setValueAtTime(
      1450,
      start,
    )

    filter.Q.value = 0.55

    /* main note */

    gain.gain.setValueAtTime(
      0.0001,
      start,
    )

    gain.gain
      .exponentialRampToValueAtTime(
        volume,
        start + 0.075,
      )

    gain.gain.setValueAtTime(
      volume * 0.75,
      start +
        duration *
          0.55,
    )

    gain.gain
      .exponentialRampToValueAtTime(
        0.0001,
        start +
          duration +
          0.28,
      )

    /* very soft harmonic */

    harmonicGain.gain
      .setValueAtTime(
        0.0001,
        start,
      )

    harmonicGain.gain
      .exponentialRampToValueAtTime(
        volume * 0.08,
        start + 0.12,
      )

    harmonicGain.gain
      .exponentialRampToValueAtTime(
        0.0001,
        start +
          duration +
          0.18,
      )

    osc.connect(filter)

    filter.connect(gain)

    gain.connect(output)

    harmonic.connect(
      harmonicGain,
    )

    harmonicGain.connect(
      output,
    )

    osc.start(start)

    harmonic.start(start)

    osc.stop(
      start +
        duration +
        0.35,
    )

    harmonic.stop(
      start +
        duration +
        0.3,
    )

    audioNodesRef.current.push(
      osc,
      harmonic,
      gain,
      harmonicGain,
      filter,
    )
  }

  /* ===================================================
     WARM CHORD
  =================================================== */

  const createWarmChord = ({
    ctx,
    notes,
    start,
    duration,
    output,
  }) => {
    notes.forEach(
      (note, index) => {
        const osc =
          ctx.createOscillator()

        const gain =
          ctx.createGain()

        const filter =
          ctx.createBiquadFilter()

        osc.type =
          index === 0
            ? 'sine'
            : 'triangle'

        osc.frequency
          .setValueAtTime(
            NOTES[note],
            start,
          )

        filter.type =
          'lowpass'

        filter.frequency.value =
          650

        gain.gain
          .setValueAtTime(
            0.0001,
            start,
          )

        gain.gain
          .exponentialRampToValueAtTime(
            index === 0
              ? 0.015
              : 0.009,
            start + 0.4,
          )

        gain.gain
          .setValueAtTime(
            index === 0
              ? 0.013
              : 0.008,
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

        osc.connect(
          filter,
        )

        filter.connect(
          gain,
        )

        gain.connect(
          output,
        )

        osc.start(start)

        osc.stop(
          start +
            duration +
            0.2,
        )

        audioNodesRef.current.push(
          osc,
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
    output,
  }) => {
    const osc =
      ctx.createOscillator()

    const gain =
      ctx.createGain()

    const filter =
      ctx.createBiquadFilter()

    osc.type = 'sine'

    osc.frequency
      .setValueAtTime(
        NOTES[note],
        start,
      )

    filter.type =
      'lowpass'

    filter.frequency.value =
      250

    gain.gain
      .setValueAtTime(
        0.0001,
        start,
      )

    gain.gain
      .exponentialRampToValueAtTime(
        0.014,
        start + 0.25,
      )

    gain.gain
      .exponentialRampToValueAtTime(
        0.0001,
        start +
          duration,
      )

    osc.connect(filter)

    filter.connect(gain)

    gain.connect(output)

    osc.start(start)

    osc.stop(
      start +
        duration +
        0.1,
    )

    audioNodesRef.current.push(
      osc,
      gain,
      filter,
    )
  }

  /* ===================================================
     PLAY WARM HAPPY BIRTHDAY
  =================================================== */

  const playMusic = async () => {
    stopMusic()

    const AudioCtx =
      window.AudioContext ||
      window.webkitAudioContext

    if (!AudioCtx) return

    const ctx =
      new AudioCtx()

    audioContextRef.current =
      ctx

    if (
      ctx.state ===
      'suspended'
    ) {
      await ctx.resume()
    }

    const master =
      ctx.createGain()

    const compressor =
      ctx.createDynamicsCompressor()

    const delay =
      ctx.createDelay(1)

    const feedback =
      ctx.createGain()

    const delayVolume =
      ctx.createGain()

    /*
      Fade in supaya awal
      musik nggak mengagetkan.
    */

    master.gain
      .setValueAtTime(
        0.0001,
        ctx.currentTime,
      )

    master.gain
      .exponentialRampToValueAtTime(
        0.72,
        ctx.currentTime +
          0.85,
      )

    compressor.threshold.value =
      -24

    compressor.knee.value =
      30

    compressor.ratio.value =
      3

    compressor.attack.value =
      0.02

    compressor.release.value =
      0.6

    /*
      Reverb-like echo ringan.
      Sengaja kecil agar tidak creepy.
    */

    delay.delayTime.value =
      0.27

    feedback.gain.value =
      0.11

    delayVolume.gain.value =
      0.075

    master.connect(
      compressor,
    )

    master.connect(delay)

    delay.connect(feedback)

    feedback.connect(delay)

    delay.connect(
      delayVolume,
    )

    delayVolume.connect(
      compressor,
    )

    compressor.connect(
      ctx.destination,
    )

    audioNodesRef.current.push(
      master,
      compressor,
      delay,
      feedback,
      delayVolume,
    )

    let cursor =
      ctx.currentTime +
      0.7

    const songStart =
      cursor

    /*
      Chord lembut di belakang.
    */

    const chordLength =
      3.55

    CHORDS.forEach(
      (chord, index) => {
        const start =
          songStart +
          index *
            chordLength

        createWarmChord({
          ctx,

          notes: chord,

          start,

          duration:
            chordLength +
            0.45,

          output: master,
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

          output: master,
        })
      },
    )

    /*
      Melody utama.
    */

    MELODY.forEach(
      ([note, duration]) => {
        createSoftNote({
          ctx,

          frequency:
            NOTES[note],

          start: cursor,

          duration,

          volume: 0.061,

          output: master,
        })

        cursor +=
          duration +
          0.075
      },
    )

    /*
      Fade out pelan.
    */

    const ending =
      cursor + 0.75

    master.gain
      .setValueAtTime(
        0.72,
        ending - 1.6,
      )

    master.gain
      .exponentialRampToValueAtTime(
        0.0001,
        ending,
      )

    setIsPlaying(true)

    const timer =
      setTimeout(() => {
        setIsPlaying(false)
      }, SONG_DURATION_MS)

    timersRef.current.push(
      timer,
    )
  }

  /* ===================================================
     GALLERY
  =================================================== */

  const nextPhoto = () => {
    setGalleryIndex(
      (index) =>
        (index + 1) %
        PHOTOS.length,
    )
  }

  const previousPhoto = () => {
    setGalleryIndex(
      (index) =>
        (index -
          1 +
          PHOTOS.length) %
        PHOTOS.length,
    )
  }

  const handleGalleryDown = (
    event,
  ) => {
    swipeStartRef.current =
      event.clientX
  }

  const handleGalleryUp = (
    event,
  ) => {
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
      Math.abs(distance) <
      45
    ) {
      return
    }

    if (distance < 0) {
      nextPhoto()
    } else {
      previousPhoto()
    }
  }

  /* ===================================================
     WISH MACHINE
  =================================================== */

  const shuffleWish = () => {
    setWishPulse(false)

    setWishIndex(
      (index) => {
        let next = index

        while (
          next === index
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
        setWishPulse(true)
      },
    )

    const timer =
      setTimeout(() => {
        setWishPulse(false)
      }, 650)

    timersRef.current.push(
      timer,
    )
  }

  /* ===================================================
     HOLD TO 100%
  =================================================== */

  const triggerCelebration =
    () => {
      /*
        Reset dulu supaya
        kalau diulang animasi
        benar-benar restart.
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

      setHoldProgress(100)

      playMusic()

      /*
        Celebration mengikuti
        durasi lagu.
      */

      const timer =
        setTimeout(() => {
          setCelebrating(
            false,
          )
        }, SONG_DURATION_MS)

      timersRef.current.push(
        timer,
      )
    }

  const startHold = () => {
    if (
      holdProgress >= 100
    ) {
      triggerCelebration()

      return
    }

    clearInterval(
      holdTimerRef.current,
    )

    holdTimerRef.current =
      setInterval(() => {
        setHoldProgress(
          (progress) => {
            const next =
              Math.min(
                progress + 4,
                100,
              )

            if (
              next >= 100
            ) {
              clearInterval(
                holdTimerRef.current,
              )

              holdTimerRef.current =
                null

              setTimeout(
                triggerCelebration,
                100,
              )
            }

            return next
          },
        )
      }, 55)
  }

  const stopHold = () => {
    clearInterval(
      holdTimerRef.current,
    )

    holdTimerRef.current =
      null

    setHoldProgress(
      (progress) =>
        progress >= 100
          ? 100
          : 0,
    )
  }

  /* ===================================================
     CURSOR EFFECT
  =================================================== */

  const handlePointerMove = (
    event,
  ) => {
    document.documentElement
      .style
      .setProperty(
        '--mx',
        `${event.clientX}px`,
      )

    document.documentElement
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
        `${y * -3.5}deg`,
      )

    heroRef.current
      .style
      .setProperty(
        '--ry',
        `${x * 4.5}deg`,
      )
  }

  const resetTilt = () => {
    if (!heroRef.current) {
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
     CLEANUP
  =================================================== */

  useEffect(() => {
    return () => {
      timersRef.current.forEach(
        clearTimeout,
      )

      clearInterval(
        holdTimerRef.current,
      )

      audioNodesRef.current
        .forEach((node) => {
          try {
            if (
              typeof node.stop ===
              'function'
            ) {
              node.stop()
            }
          } catch (_) {
            // ignored
          }
        })

      if (
        audioContextRef.current
      ) {
        audioContextRef.current
          .close()
          .catch(() => {})
      }
    }
  }, [])

  /* ===================================================
     UI
  =================================================== */

  return (
    <main
      className={`app ${
        entered
          ? 'entered'
          : ''
      }`}
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

      <div
        className="floating-dots"
        aria-hidden="true"
      >
        {FLOATING_DOTS.map(
          (dot) => (
            <span
              key={dot.id}
              style={{
                left:
                  dot.left,

                top:
                  dot.top,

                animationDelay:
                  dot.delay,

                width:
                  dot.size,

                height:
                  dot.size,
              }}
            />
          ),
        )}
      </div>

      {/* INTRO */}

      {!entered && (
        <section className="intro-screen">
          <div className="intro-card">
            <div className="intro-orbit">
              <span>R</span>
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
              onClick={() =>
                setEntered(true)
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

      {/* =================================================
          LONG CELEBRATION
      ================================================= */}

      {celebrating && (
        <div
          className="birthday-celebration"
          style={{
            '--song-duration':
              '17.5s',
          }}
        >
          <div className="birthday-darken" />

          <div className="birthday-aurora" />

          {/* Stars */}

          <div className="birthday-stars">
            {Array.from({
              length: 38,
            }).map(
              (_, index) => (
                <span
                  key={
                    index
                  }
                  style={{
                    '--star-i':
                      index,
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
                  key={index}
                  className="firework"
                  style={{
                    left: `${firework.x}%`,

                    top: `${firework.y}%`,

                    '--delay': `${firework.delay}s`,

                    '--scale':
                      firework.scale,
                  }}
                >
                  <span className="firework-center" />

                  {SPARKS.map(
                    (spark) => (
                      <span
                        key={
                          spark
                        }
                        className="firework-spark"
                        style={{
                          '--angle': `${
                            spark *
                            15
                          }deg`,
                        }}
                      />
                    ),
                  )}
                </div>
              ),
            )}
          </div>

          {/* Main text */}

          <div className="birthday-copy">
            <p className="birthday-top-label">
              YOUR DAY · YOUR MOMENT
            </p>

            <h2>
              <span className="happy">
                HAPPY
              </span>

              <span className="birthday">
                BIRTHDAY
              </span>

              <strong>
                RIZKI!
              </strong>
            </h2>

            <div className="birthday-divider" />

            <p className="birthday-wish">
              Semoga banyak hal
              baik datang di umur
              yang baru ini.
            </p>

            <p className="birthday-wish-sub">
              Have fun, nikmatin
              liburannya, dan
              pulang bawa cerita
              yang seru.
            </p>

            <div className="birthday-love">
              <Heart
                size={20}
                fill="currentColor"
              />
            </div>
          </div>

          {/* CONFETTI */}

          <div className="celebration-confetti">
            {CONFETTI.map(
              (item) => (
                <span
                  key={
                    item
                  }
                  style={{
                    '--i':
                      item,
                  }}
                />
              ),
            )}
          </div>
        </div>
      )}

      {/* NAV */}

      <nav className="nav-wrap">
        <a
          href="#top"
          className="logo"
        >
          R<span>.</span>
        </a>

        <p>
          MUHAMMAD RIZKI ADITYA
        </p>

        <button
          className="music-button"
          onClick={
            isPlaying
              ? stopMusic
              : playMusic
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

      {/* HERO */}

      <section
        className="hero"
        id="top"
      >
        <div
          className="hero-card"
          ref={heroRef}
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
                  isPlaying
                    ? stopMusic
                    : playMusic
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

      {/* =================================================
          MESSAGE
      ================================================= */}

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
                <span>R</span>
              </div>

              <p>
                Ada sedikit ucapan
                yang sengaja disimpan
                di sini.
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
                dan yang bikin capek
                semoga nggak betah
                lama-lama.
              </p>

              <p>
                Tetap jadi orang
                yang seru diajak
                ngobrol, tetap punya
                waktu buat diri
                sendiri, dan jangan
                lupa nikmatin yang
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
                <span>PS.</span>

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

      {/* =================================================
          GALLERY
      ================================================= */}

      <section className="section gallery-section">
        <div className="section-heading gallery-title">
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
                  Math.abs(offset)

                const visible =
                  distance <= 2

                const x =
                  offset * 58

                const y =
                  distance * 18

                const scale =
                  Math.max(
                    0.78,
                    1 -
                      distance *
                        0.09,
                  )

                const rotate =
                  offset * 4.5

                return (
                  <button
                    key={
                      photo.src
                    }
                    className={`photo-card ${
                      offset === 0
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
                        offset === 0
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
                          index + 1,
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

      {/* RANDOM WISH */}

      <section className="section">
        <div className="wish-box">
          <div className="wish-decoration">
            <Sparkles
              size={50}
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
            <span>✦</span>

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

      {/* FINAL */}

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
          <span>R.</span>

          Made for Muhammad
          Rizki Aditya
        </div>

        <p>
          have fun on your
          holiday.
        </p>
      </footer>

      {/* PHOTO MODAL */}

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
                      (activePhoto -
                        1 +
                        PHOTOS.length) %
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
                      (activePhoto +
                        1) %
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