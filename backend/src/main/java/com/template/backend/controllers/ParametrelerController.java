package com.template.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.template.backend.entities.parametreler.AracDurumu;
import com.template.backend.entities.parametreler.Marka;
import com.template.backend.entities.parametreler.Model;
import com.template.backend.entities.parametreler.MotorHacmi;
import com.template.backend.entities.parametreler.Sanziman;
import com.template.backend.entities.parametreler.YakitTuru;
import com.template.backend.entities.parametreler.YapilanIslem;
import com.template.backend.service.parametreler.AracDurumuService;
import com.template.backend.service.parametreler.MarkaService;
import com.template.backend.service.parametreler.ModelService;
import com.template.backend.service.parametreler.MotorHacmiService;
import com.template.backend.service.parametreler.SanzimanService;
import com.template.backend.service.parametreler.YakitTuruService;
import com.template.backend.service.parametreler.YapilanIslemService;
@RestController
@RequestMapping("/api/parametreler")
public class ParametrelerController {

    @Autowired
    private MarkaService markaService;

    @Autowired
    private ModelService modelService;

    @Autowired
    private MotorHacmiService motorHacmiService;

    @Autowired
    private SanzimanService sanzimanService;

    @Autowired
    private YakitTuruService yakitTuruService;

    @Autowired
    private AracDurumuService aracDurumuService;

    @Autowired
    private YapilanIslemService yapilanIslemService;

    @GetMapping("/markalar")
    public ResponseEntity<List<Marka>> markalar() {
        List<Marka> markalar = markaService.findAllMarkalar();
        return ResponseEntity.ok(markalar);
    }

    @GetMapping("/tum-modeller")
    public ResponseEntity<List<Model>> modeller() {
        List<Model> modeller = modelService.findAll();
        return ResponseEntity.ok(modeller);
    }

    @GetMapping("/modeller/{markaId}")
    public ResponseEntity<List<Model>> findByMarkaId(@PathVariable Long markaId) {
        List<Model> modeller = modelService.findByMarkaId(markaId);
        return ResponseEntity.ok(modeller);
    }

    @GetMapping("/motor-hacimleri")
    public ResponseEntity<List<MotorHacmi>> motorHacimleri() {
        List<MotorHacmi> motorHacimleri = motorHacmiService.findAllMotorHacmi();
        return ResponseEntity.ok(motorHacimleri);
    }

    @GetMapping("/sanzimanlar")
    public ResponseEntity<List<Sanziman>> sanzimans() {
        List<Sanziman> sanzimans = sanzimanService.findAllSanziman();
        return ResponseEntity.ok(sanzimans);
    }

    @GetMapping("/yakit-turleri")
    public ResponseEntity<List<YakitTuru>> yakitTuru() {
        List<YakitTuru> yakitTuru = yakitTuruService.findAllYakitTuru();
        return ResponseEntity.ok(yakitTuru);
    }

    @GetMapping("/arac-durumlari")
    public ResponseEntity<List<AracDurumu>> aracDurumlar() {
        List<AracDurumu> aracDurumlar = aracDurumuService.findAllAracDurumu();
        return ResponseEntity.ok(aracDurumlar);
    }

    @GetMapping("/yapilan-islemler")
    public ResponseEntity<List<YapilanIslem>> yapilanIslemler() {
        List<YapilanIslem> yapilanIslemler = yapilanIslemService.findAllYapilanIslem();
        return ResponseEntity.ok(yapilanIslemler);
    }
    
}
