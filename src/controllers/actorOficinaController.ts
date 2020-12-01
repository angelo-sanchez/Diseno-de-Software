'use strict';

import { Request, Response } from 'express';
import { ActorOficinaRepository } from '../repositories/actorOficinaRepository';
import { ActorOficinaService } from '../services/actorOficinaService';

export class ActorOficinaController {

    public findAll(req: Request, res: Response) {

        let query: any = {};

        if (req.query.usuario) {
            query.usuario = req.query.usuario;
        }

        if (req.query.entrada) {
            query.entrada = req.query.entrada;
        }

        if (req.query.salida) {
            query.salida = req.query.salida;
        }

        if (req.query.oficina) {
            query.oficina = req.query.oficina;
        }


        ActorOficinaService.findAll(query)
            .then((data: any) => {
                return res.status(data.status || 200).json(data.payload);
            })
            .catch((err: any) => {
                console.log(err);
                return res.status(err.status || 500).json({ errors: [{ general: err.msg }] });
            });
    }

    public create(req: Request, res: Response) {
        const data: any = {};
        if (!(req.body && req.body.usuario && req.body.oficina)) {
            return res.status(400).json({
                error: "La consulta debe tener los siguientes parámetros: \n"
                    + "\tbody: { usuario, oficina }"
            });
        }
        data.usuario = req.body.usuario;
        data.oficina = req.body.oficina;
        ActorOficinaService.create(data)
            .then((data: any) => {
                return res.status(data.status || 201).json(data.payload);
            })
            .catch((err: any) => {
                return res.status(err.status || 500).json({ errors: [{ general: err.msg }] });
            });
    }
    public async salir(req: Request, res: Response) {
        try {
            if (!(req.body && req.body.usuario && req.body.oficina))
                throw {
                    status: 400,
                    detail: "Error: La consulta no contiene los parámetros necesarios\n"
                        + "\tSe espera body: { nameid, oficina }"
                }
            const { usuario, oficina } = req.body;
            const actorOficina = await ActorOficinaRepository.findOne({ usuario, oficina, salida: null });
            actorOficina.set("salida", Date.now());
            actorOficina.save();
            return res.status(200).json({ out: true, actorOficina });
        } catch (error) {
            return res.status(error.status || 500).json({ error: error.detail || error });
        }
    }

    public async historialActor(req: Request, res: Response) {
        try {
            if (!(req.body.usuario))
                throw {
                    status: 400,
                    detail: "Error: La consulta no contiene los parámetros necesarios\n"
                        + "\tSe espera body: { nameid }"
                }
            const { usuario } = req.body;
            const actorOficina = await ActorOficinaRepository.findAll({ usuario });

            return res.status(200).json({ out: actorOficina });
        } catch (error) {
            return res.status(error.status || 500).json({ error: error.detail || error });
        }
    }

    public async historialOficina(req: Request, res: Response) {
        try {
            if (!(req.body.oficina))
                throw {
                    status: 400,
                    detail: "Error: La consulta no contiene los parámetros necesarios\n"
                        + "\tSe espera body: { oficina }"
                }
            const { oficina } = req.body;
            const actorOficina = await ActorOficinaRepository.findAll({ oficina });

            return res.status(200).json({ out: actorOficina });
        } catch (error) {
            return res.status(error.status || 500).json({ error: error.detail || error });
        }
    }
}