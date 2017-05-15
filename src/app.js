import React, {PropTypes, Component} from 'react'
import classNames from 'classnames'
import animateScrollTo from 'animated-scroll-to'
import FR from './fr';
import EN from './en';

export default class App extends Component {
  // static propTypes = {
  //   isReady: PropTypes.bool
  // }

  constructor(props) {
    super(props)
    this.state = {
      isShown: false,
      currentLang: 'FR'
      
    }
    this.onClick = this.onClick.bind(this)
    this.scrollTo = this.scrollTo.bind(this)
    this.onLinkClick = this.onLinkClick.bind(this)
    this.onLangSwitch = this.onLangSwitch.bind(this)
  }

  scrollTo(target) {
    if (target === '') {
      target = 'landing'
    }
    if (!/aPropos|lePremierNumero|contacts|landing/.test(target)) {
      return 
    }
    const destination = window.scrollY + this.refs[target].getClientRects()[0].top - 120
    const options = {
      // duration of the scroll per 1000px, default 500
      speed: 700,

      // minimum duration of the scroll
      minDuration: 250,

      // maximum duration of the scroll
      maxDuration: 1000,

      // should animated scroll be canceled on user scroll/keypress
      // if set to "false" user input will be disabled until animated scroll is complete
      cancelOnUserAction: true
    }
    animateScrollTo(destination, options)
  }

  onLinkClick(e) {
    e.preventDefault()
    let hash = e.currentTarget.getAttribute('href')
    const currentHash = location.hash
    if (hash !== currentHash) {
      window.history.pushState({}, '', hash)
    }
    this.scrollTo(hash.slice(1))
  }

  onClick() {
    console.log('click');
  }

  onLangSwitch(e) {
    const targetLang = e.currentTarget.getAttribute('data-lang')
    this.setState({
      currentLang: targetLang
    })
  }

  componentDidMount() {
    this.setState({
      isShown: true
    })
    const hash = location.hash.slice(1)
    if (hash) {
      this.scrollTo(hash)
    }
  }

  componentWillReceiveProps() {
    console.log('receiverd');
  }

  renderParapraph(ps) {
    if (!Array.isArray(ps)) {
      ps = [ps]
    }
    return ps.map((p, i) => {
      return (<p key={i}>{p}</p>)
    })
  }

  render() {
    const currentLangRef = this.state.currentLang === 'FR' ? FR : EN
    
    return (
      <div 
        className={classNames('main', {
          'is-shown': this.state.isShown
        })}
      >
        <nav>
          <div className="nav__left"><a href="#" onClick={this.onLinkClick}>Typologie</a></div>
          <div className="nav__center"><a href="#lePremierNumero" onClick={this.onLinkClick}>{currentLangRef.navCenter}</a></div>
          <div className="nav__right"><a href="#aPropos" onClick={this.onLinkClick}>Infos</a></div>
        </nav>

        <div className="nav__bottom">
          <a className="nav__bottom__row" href="https://www.kickstarter.com/projects/329839494/641184402?token=5cd621ce" target="_blank"><span className="underline">Get your copy !</span></a>
          <div className="nav__bottom__row">
          <div className="header"><span className="underline">Follow us</span></div>
          <a className="underline" href="https://www.instagram.com/collectiontypologie/" target="_blank">Instagram</a>
          <span> / </span>
          <a className="underline" href="https://www.facebook.com/collectionstypologie/posts_to_page/" target="_blank">Facebook</a>
          </div>
          <a className="nav__bottom__row" href="#contacts" onClick={this.onLinkClick}><span className="underline">contact</span></a>
        </div>

        <section className="landing" ref="landing">
          <img src="/static/cover.jpg" />
        </section>

        <section id="aPropos" className="a-propos" ref="aPropos">
          <h2>
            <span>{currentLangRef.aPropos.title}</span>
            <span className="span--lang">
              <span 
                className={classNames({active: this.state.currentLang === 'EN'})}
                data-lang="EN"
                onClick={this.onLangSwitch}
              >
                EN 
              </span> / <span
                className={classNames({active: this.state.currentLang === 'FR'})}
                data-lang="FR"
                onClick={this.onLangSwitch}
              >
                FR
              </span>
            </span>
          </h2>
          {this.renderParapraph(currentLangRef.aPropos.body)}

          <img src="/static/info-1.jpg" />
        </section>

        <section id="lePremierNumero" className="le-premier-numero" ref="lePremierNumero">
          <h2><span>{currentLangRef.lePremierNumero.title}</span></h2>
          {this.renderParapraph(currentLangRef.lePremierNumero.body)}

          <img src="/static/n1-1.jpg" />
          <img src="/static/n1-2.jpg" />
          <img src="/static/n1-3.jpg" />
          <img src="/static/n1-4.jpg" />
          <img src="/static/n1-5.jpg" />
          <img src="/static/n1-6.jpg" />
          <img src="/static/n1-7.jpg" />
          <img src="/static/n1-8.jpg" />
          <img src="/static/n1-9.jpg" />
          <img src="/static/n1-10.jpg" />
          <img src="/static/n1-11.jpg" />
          <img className="cover" src="/static/n1-12.jpg" />
        </section>

        <section id="contacts" className="contacts" ref="contacts">
          <h2><span>{currentLangRef.contacts.title}</span></h2>
          {this.renderParapraph(currentLangRef.contacts.body)}

          <img src="/static/Typologie.jpg" />
        </section>
      </div>
    )
  }
}
