import React, {PropTypes, Component} from 'react'
import classNames from 'classnames';
import animateScrollTo from 'animated-scroll-to'

export default class App extends Component {
  // static propTypes = {
  //   isReady: PropTypes.bool
  // }

  constructor(props) {
    super(props)
    this.state = {
      isShown: false
    }
    this.onClick = this.onClick.bind(this)
    this.scrollTo = this.scrollTo.bind(this)
    this.onLinkClick = this.onLinkClick.bind(this)
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

  render() {
    return (
      <div 
        className={classNames('main', {
          'is-shown': this.state.isShown
        })}
      >
        <nav>
          <div className="nav__left"><a href="#" onClick={this.onLinkClick}>Typologie</a></div>
          <div className="nav__center"><a href="#lePremierNumero" onClick={this.onLinkClick}>n°1 - La boule de pétanque</a></div>
          <div className="nav__right"><a href="#aPropos" onClick={this.onLinkClick}>Infos</a></div>
          <div className="nav__bottom">
            <a className="nav__bottom__row"><span className="underline">Support us</span></a>
            <div className="nav__bottom__row">
              <div className="header"><span className="underline">Follow us</span></div>
              <a className="underline" href="https://www.instagram.com/collectiontypologie/" target="_blank">Instagram</a>
              <span> / </span>
              <a className="underline" href="https://www.facebook.com/collectionstypologie/posts_to_page/" target="_blank">Facebook</a>
            </div>
            <a className="nav__bottom__row" href="#contacts" onClick={this.onLinkClick}><span className="underline">contact</span></a>
          </div>
        </nav>

        <section className="landing" ref="landing">
          <img src="/static/photo_couverture_maquette_typologie.jpg" />
        </section>

        <section id="aPropos" className="a-propos" ref="aPropos">
          <h2><span>A propos :</span></h2>
          <p>
            Typologie est une revue bi-annuelle qui s’intéresse aux objets ordinaires. Elle souhaite attirer l’attention des lecteurs sur l’intelligence
            et la poésie de certains objets de consommation courante que leur évidence dissimule. Chaque numéro sera consacré à une typologie d’objet dont elle racontera la fabrication, l’histoire et l’usage à travers des images d’archives, des photographies originales, des textes et une interview croisée. Riche de 56 pages et illustrée de 65 reproductions bichromatiques, la revue sera vendue au prix de 12 euros. Elle est co-éditée par les Collections Typologie et les Editions B42.<br /><br />
            Fondée par six jeunes designers industriels passionnés des formes, la collection tire parti de leur sensibilité pour donner une vision différente et approfondie des objets usuels qui nous entourent. La boule de pétanque, le bouchon en liège, la cagette, le carreau de terre cuite, le verre à pied ...
          </p>

          <img src="/static/DSC_3958.jpg" />
        </section>

        <section id="lePremierNumero" className="le-premier-numero" ref="lePremierNumero">
          <h2><span>Le premier numéro :</span></h2>
          <p>
            Le premier objet présenté dans Typologie est
            la boule de pétanque. Elle est parfaitement banale en apparence mais son étude révèle un contenu insoupçonné : sa  liation avec la tradition universelle des jeux de boules, une histoire moderne et populaire, une fabrication industrielle sophistiquée, succession de différents procédés que la constante de sa forme permet de mettre en évidence. Mais aussi un contenu sociologique, des règles, un cadre, un glossaire, une gestuelle, et même une philosophie de vie...<br />
            Quand au deuxième numéro, il sera consacré au bouchon en liège !
          </p>

          <img src="/static/photo_interieur_3_maquette_typologie.jpg" />
          <img src="/static/photo_interieur_1_maquette_typologie2.jpg" />
          <img src="/static/photo_interieur_4_maquette_typologie.jpg" />
          <img src="/static/photo_4eme_couverture_maquette_typologie.jpg" />
        </section>

        <section id="contacts" className="contacts" ref="contacts">
          <h2><span>Contacts :</span></h2>
          <p>
            La revue Typologie est dirigée par Raphaël Daufresne et Thélonious Goupil.<br /><br />
            Il a été imaginé par les membres des Collections Typologie. Ce collectif est formé par sept designers industriels : Guillaume Bloget, Raphaël Daufresne, Adrien Goubet, Thélonious Goupil, Guillaume Jandin, Alexandre d’Orsetti et Yun Li.<br /><br />
            contact@collectionstypologie.com<br />
            @collectionstypologie
          </p>

          <img src="/static/Typologie.jpg" />
        </section>
      </div>
    )
  }
}
