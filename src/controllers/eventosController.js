/* eslint-disable linebreak-style */
import Evento from '../models/evento.js';

class EventoController {
  static liberaAcessoEventos = () => process.env.EVENTO_FLAG === 'true';

  static listarEvetos = async (req, res) => {
    if (this.liberaAcessoEventos()) {
      try {
        const resultado = await Evento.pegarEvento();
        return res.status(200).json(resultado);
      } catch (error) {
        return res.status(500).json(error.message);
      }
    } else {
      return res.status(404).send();
    }
  };
}

export default EventoController;
