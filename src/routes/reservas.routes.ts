import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Reserva } from "../entities/Reserva";
import { asyncHandler } from "../middlewares/asyncHandler";
import { HttpError } from "../middlewares/errorHandler";

const router = Router();
const reservaRepo = AppDataSource.getRepository(Reserva);

function parseId(valor: string): number {
  const id = Number(valor);
  if (!Number.isInteger(id) || id <= 0) {
    throw new HttpError(400, "El id debe ser un número entero positivo");
  }
  return id;
}

// CREAR
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const nueva = reservaRepo.create(req.body as Partial<Reserva>);
    const guardada = await reservaRepo.save(nueva);
    res.status(201).json(guardada);
  })
);

// LISTAR
router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const reservas = await reservaRepo.find({ order: { fecha: "ASC" } });
    res.json(reservas);
  })
);

// OBTENER UNA
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = parseId(req.params.id);
    const reserva = await reservaRepo.findOneBy({ id });
    if (!reserva) throw new HttpError(404, "Reserva no encontrada");
    res.json(reserva);
  })
);

// ACTUALIZAR
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = parseId(req.params.id);
    const reserva = await reservaRepo.findOneBy({ id });
    if (!reserva) throw new HttpError(404, "Reserva no encontrada");
    reservaRepo.merge(reserva, req.body as Partial<Reserva>);
    const actualizada = await reservaRepo.save(reserva);
    res.json(actualizada);
  })
);

// ELIMINAR
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = parseId(req.params.id);
    const resultado = await reservaRepo.delete(id);
    if (resultado.affected === 0) throw new HttpError(404, "Reserva no encontrada");
    res.status(204).send();
  })
);

export default router;
