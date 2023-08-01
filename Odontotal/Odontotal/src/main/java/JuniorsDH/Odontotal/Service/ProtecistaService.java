package JuniorsDH.Odontotal.Service;
import JuniorsDH.Odontotal.Domain.Paciente;
import JuniorsDH.Odontotal.Domain.Protecista;
import JuniorsDH.Odontotal.Dto.ProtecistaDto;
import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Repository.ProtecistaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProtecistaService {
    private ProtecistaRepository protecistaRepository;
    @Autowired
    public ProtecistaService(ProtecistaRepository protecistaRepository) {
        this.protecistaRepository = protecistaRepository;
    }

    public ProtecistaDto agregarProtecista(ProtecistaDto protecistaDto)throws DataInvalidException {
        Protecista protecistaAGuardar;

       if(protecistaDto.getNombre().isEmpty()||protecistaDto.getApellido().isEmpty()||protecistaDto.getEspecialidadProtecista()==null){
        throw new DataInvalidException("Error. No se puede agregar PROTECISTA, alguno de los datos de registro estan incompletos");
       }else {
          protecistaAGuardar= protecistaRepository.save(protecistaDtoAProtecista(protecistaDto));
       }
       return protecistaAProtecistaDto(protecistaAGuardar);
    }

    public Optional<ProtecistaDto> listarProtecista(Long id)throws ResourceNotFoundException {

        Optional<Protecista> protecistaBuscado= protecistaRepository.findById(id);
        if (protecistaBuscado.isPresent()){
            return Optional.of(protecistaAProtecistaDto(protecistaBuscado.get()));
        }else {
            throw new ResourceNotFoundException("Error, No existe el PROTECISTA buscado, revisar su registro ");
        }

    }

    public ProtecistaDto modificarProtecista (ProtecistaDto protecistaDto) throws ResourceNotFoundException {
        Optional<Protecista> protecistaBuscado= protecistaRepository.findById(protecistaDto.getId());
        Protecista protecistaGuardado;
        if (protecistaBuscado.isPresent()){
            protecistaGuardado=protecistaRepository.save(protecistaDtoAProtecista(protecistaDto));
        }else {
            throw new ResourceNotFoundException("Error. No se encontro el PROTECISTA, revisar su registro previo");

        }
        return  protecistaAProtecistaDto(protecistaGuardado);

    }

    public void  eliminarProtecista (Long id)throws ResourceNotFoundException{
        Optional<ProtecistaDto> protecistaAElimminar = listarProtecista(id);
        if (protecistaAElimminar.isPresent()){
            protecistaRepository.deleteById(id);
        }else {
            throw new ResourceNotFoundException("Error. El PROTECISTA a eliminar no se encuentra en la base de datos, revisar su registro");
        }

    }


    public List<ProtecistaDto> listarTodosProtecistas()throws ResourceNotFoundException{
        List<Protecista> protecistasList= protecistaRepository.findAll();
        List<ProtecistaDto> pasoProtecistasADTO=new ArrayList<>();
        if (protecistasList.isEmpty()){
            throw new ResourceNotFoundException("Error. No se encontro ningun PROTECISTA en la lista, revisar sus registros");
        }else {
            for (Protecista protecista : protecistasList) {
                pasoProtecistasADTO.add(protecistaAProtecistaDto(protecista));
            }
        }
        return pasoProtecistasADTO;

    }


    public Long obtenerUltimoIdAsc() throws ResourceNotFoundException{
        List<Protecista> odontologos = protecistaRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        if (!odontologos.isEmpty()) {
            return odontologos.get(odontologos.size() - 1).getId();
        } else {
            throw new ResourceNotFoundException("No existen ID registrados");
        }
    }


    private ProtecistaDto protecistaAProtecistaDto(Protecista protecista){
        ProtecistaDto protecistaDto= new ProtecistaDto();

        protecistaDto.setId(protecista.getId());
        protecistaDto.setNombre(protecista.getNombre());
        protecistaDto.setApellido(protecista.getApellido());
        protecistaDto.setEspecialidadProtecista(protecista.getEspecialidadProtecista());
        protecistaDto.setUrlImagen(protecista.getUrlImagen());

        return protecistaDto;

    }

    private Protecista protecistaDtoAProtecista(ProtecistaDto protecistaDto){

        Protecista protecista=new Protecista();

        protecista.setId(protecistaDto.getId());
        protecista.setNombre(protecistaDto.getNombre());
        protecista.setApellido(protecistaDto.getApellido());
        protecista.setEspecialidadProtecista(protecistaDto.getEspecialidadProtecista());
        protecista.setUrlImagen(protecistaDto.getUrlImagen());

        return protecista;
    }








}
