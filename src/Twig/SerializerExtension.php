<?php

namespace App\Twig;

use ApiPlatform\Core\Api\IriConverterInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Symfony\Component\Serializer\SerializerInterface;

class SerializerExtension extends AbstractExtension
{
    private $serializer;
    private $iriConverter;

    public function __construct(SerializerInterface $serializer, IriConverterInterface $iriConverter)
    {
        $this->serializer = $serializer;
        $this->iriConverter = $iriConverter;
    }

    public function getFilters(): array
    {
        return [
            new TwigFilter('jsonld', [$this, 'serializeToJsonLd'], ['is_safe' => ['html']]),
            new TwigFilter('iri', [$this, 'convertToIri'], ['is_safe' => ['html']]),
        ];
    }

    public function serializeToJsonLd($data): string
    {
        return $this->serializer->serialize($data, 'jsonld');
    }

    public function convertToIri(object $item): string
    {
        return $this->iriConverter->getIriFromItem($item);
    }
}
