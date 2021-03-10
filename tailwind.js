module.exports = {
  purge: {
    enabled: ( process.env.NODE_ENV == 'production' ? true :  false ),
    content: [
      './src/**/*.html',
      './src/**/*.vue',
      './src/**/*.js'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    animation: {
      bounce: 'bounce 0.3s infinite',
      spin: 'spin 1s linear infinite'
    },
    minHeight: {
      t_min_body: 'calc(100vh - 400px)', // window h - min head - min footer - menu
      t_m_min_body: 'calc(100vh - 300px)',

      t_min_header: '200px',
      t_m_min_header: '150px',

      t_min_menu: '100px',
      t_m_min_menu: '50px',

      t_min_footer: '100px',
      t_m_min_footer: '100px'
    },
    maxHeight: {
      t_max_header: '200px',
      t_m_max_header: '150px',

      t_max_footer: '100px',
      t_m_max_footer: '100px',

      t_max_menu: '100px',
      t_m_max_menu: '50px',

      t_scroll_max_box: '300px',
      t_m_scroll_max_box: '700px'
    },
    height: {
      t_header: '200px',
      t_m_header: '150px',

      t_footer: '100px',
      t_m_footer: '100px',

      t_menu: '100px',
      t_m_menu: '50px',
    },
    extend: {
      height: {
        t_h50: '50px',
        t_h40: '40px',
      },
      width: {
        t_w50: '50px',
        t_w40: '40px',
      },
      colors: {
        t_disabled: '#848080',
        t_dark_green: '#0f674f',
        tdarkblue: '#1E4355',
        tgreen: '#316f03',
        tgraybg: '#F2F2F6',
        tdanger: '#e3342f',
        twarning: '#ff9966',
        t_dark_warning: '#f37333'
        
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: []
}
