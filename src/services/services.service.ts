import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  ServiceOffering,
  ServiceOfferingDocument,
} from './schemas/service.schema';
import { CreateServiceOfferingDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(ServiceOffering.name)
    private model: Model<ServiceOfferingDocument>,
  ) {}

  async create(dto: CreateServiceOfferingDto) {
    console.log('🚀 Criando serviço:', dto);
    console.log('🔍 artistId recebido (tipo):', typeof dto.artistId, '| valor:', dto.artistId);

    // Converter artistId para ObjectId explicitamente
    const dadosParaSalvar = {
      ...dto,
      artistId: new Types.ObjectId(dto.artistId),
    };

    console.log('💾 Salvando com artistId convertido:', dadosParaSalvar.artistId);
    const novo = await this.model.create(dadosParaSalvar);

    console.log('✅ Criado:', {
      _id: novo._id,
      artistId: novo.artistId,
      artistIdTipo: typeof novo.artistId,
      title: novo.title,
      active: novo.active
    });
    return novo;
  }
  async byArtist(artistId: string) {
    console.log('📥 Listando para artistId:', artistId);
    console.log('🔍 artistId recebido (tipo):', typeof artistId);

    const artistIdObj = new Types.ObjectId(artistId);
    console.log('🔍 artistId convertido para busca:', artistIdObj);

    const servicos = await this.model.find({
      artistId: artistIdObj,
    });

    console.log('📊 Encontrados:', servicos.length);
    console.log('📋 Títulos:', servicos.map(s => s.title));
    console.log('📋 Active:', servicos.map(s => s.active));
    console.log('📋 ArtistIds no banco:', servicos.map(s => ({
      artistId: s.artistId,
      tipo: typeof s.artistId,
      isObjectId: s.artistId instanceof Types.ObjectId
    })));

    return servicos;
  }
}
