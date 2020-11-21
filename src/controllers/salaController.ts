'use strict';

import { Request, Response } from 'express';
import { ActorRepository } from '../repositories/actorRepository';
import { RolRepository } from '../repositories/rolRepository';
import { SalaRepository } from '../repositories/salaRepository';
import { SalaService } from './../services/salaService';

export class SalaController {


    public findAll(req: Request, res: Response) {

        let query: any = {};

        if (req.query.nameSala) {
            query.nameSala = req.query.nameSala;
        }

        if (req.query.members_number) {
            query.members_number = req.query.members_number;
        }

        if (req.query.actor) {
            query.actor = req.query.actor;
        }

        if (req.query.metodologia) {
            query.metodologia = req.query.metodologia;
        }

        SalaService.findAll(query)
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

        if (req.body['nameSala'])
            data.nameSala = req.body.nameSala;
        if (req.body['members_number'])
            data.members_number = req.body.members_number;
        if (req.body['actor'])
            data.actor = req.body.actor;
        if (req.body['metodologia'])
            data.metodologia = req.body.metodologia;
        if (req.body['password'])
            data.password = req.body.password;
        SalaService.create(data)
            .then((data: any) => {
                return res.status(data.status || 201).json(data.payload);
            })
            .catch((err: any) => {
                return res.status(err.status || 500).json({ errors: [{ general: err.msg }] });
            });
    }

    public async addActor(req: Request, res: Response) {
        try {
            if (!(req.body && req.body.sala && req.body.nameid && req.body.rol)) {
                throw {
                    status: 400,
                    detail: "Error: La consulta no contiene los parámetros necesarios\n"
                        + "\tSe espera body: { sala, nameid, rol }"
                }
            }
            const actor = await ActorRepository.findActorBy({ nameid: req.body.nameid });
            if (!actor) throw {
                status: 404,
                detail: `No existe un usuario con el nameid ${req.body.nameid}`
            };
            const rol = await RolRepository.findRolByNombre(req.body.rol);
            if (!rol) throw {
                status: 404,
                detail: `No existe un rol con el nombre ${req.body.rol}`
            };

            return SalaRepository.addActorToSala({
                salaid: req.body.sala,
                userid: actor._id,
                rolid: rol._id
            });
        } catch (error) {
            return res.status(error.status || 500).json({ error: error.detail || error })
        }
    }
}