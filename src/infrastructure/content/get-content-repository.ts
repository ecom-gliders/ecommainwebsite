import { cache } from "react";
import { createContentRepository } from "./create-content-repository";

export const getContentRepository = cache(createContentRepository);
