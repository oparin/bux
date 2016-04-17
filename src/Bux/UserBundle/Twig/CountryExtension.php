<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/26/14
 * Time: 2:22 PM
 */

namespace Bux\UserBundle\Twig;

/**
 * Class CountryExtension
 *
 * @package Bux\UserBundle\Twig
 */
class CountryExtension extends \Twig_Extension
{
    /**
     * @return array
     */
    public function getFilters()
    {
        return array(
            new \Twig_SimpleFilter('country', array($this, 'countryFilter')),
        );
    }

    /**
     * @param string $countryCode
     * @param string $locale
     *
     * @return mixed
     */
    public function countryFilter($countryCode,$locale = "en")
    {
        $c = \Symfony\Component\Locale\Locale::getDisplayCountries($locale);

        return array_key_exists($countryCode, $c)
            ? $c[$countryCode]
            : $countryCode;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'country_extension';
    }
}