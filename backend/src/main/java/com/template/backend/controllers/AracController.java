package com.template.backend.controllers;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.template.backend.entities.Arac;
import com.template.backend.interfaces.IAracService;
import org.springframework.web.bind.annotation.RequestBody;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Controller
@RequestMapping("/api/araclar")
public class AracController {

    private static final Logger logger = LoggerFactory.getLogger(AracController.class);
    private final IAracService<Arac> aracService;

    public AracController(IAracService<Arac> aracService) {
        this.aracService = aracService;
    }

    @GetMapping("/page/{pageNum}")
    public ResponseEntity<Page<Arac>> findAllPagination(
        @PathVariable(value = "pageNum") int pageNum,
        @RequestParam("sortField") String sortField,
        @RequestParam("sortDir") String sortDir,
        @RequestParam("keyword") String keyword) {
        
        logger.info("=== ARACLAR PAGE REQUEST START ===");
        logger.info("PageNum: {}, SortField: {}, SortDir: {}, Keyword: '{}'", pageNum, sortField, sortDir, keyword);
        
        try {
            if (sortField == null) {
                sortField = "createdAt";
                sortDir = "desc";
            }
            
            Page<Arac> pageArac = aracService.findAllPagination(pageNum, sortField, sortDir, keyword);
            logger.info("Found {} araclar, Total Pages: {}", pageArac.getTotalElements(), pageArac.getTotalPages());
            logger.info("=== ARACLAR PAGE REQUEST SUCCESS ===");
            
            return ResponseEntity.ok(pageArac);
            
        } catch (Exception e) {
            logger.error("=== ARACLAR PAGE REQUEST FAILED ===");
            logger.error("Error: {}", e.getMessage(), e);
            throw e;
        }
    }
    
    @PostMapping
    public ResponseEntity<Arac> saveArac(@RequestBody Arac arac) {
        Arac savedArac = aracService.save(arac);
        return ResponseEntity.ok(savedArac);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArac(@PathVariable Long id) {
        aracService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Arac> getArac(@PathVariable Long id) {
        Arac arac = aracService.findById(id);
        return ResponseEntity.ok(arac);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Arac> updateArac(@PathVariable Long id, @RequestBody Arac arac) {
        Arac updatedArac = aracService.update(id, arac);
        return ResponseEntity.ok(updatedArac);
    }

}
