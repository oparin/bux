<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/22/15
 * Time: 1:45 PM
 */

namespace Bux\AdvertiseBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class AdCountryFormType
 *
 * @package Bux\AdvertiseBundle\Form\Type
 */
class AdCountryFormType extends AbstractType
{
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'class' => 'Bux\AdvertiseBundle\Entity\Country',
            'property'  => 'name',
            'expanded'  => true,
            'multiple'  => true,
            'required'  => false
        ));
    }

    /**
     * @return string
     */
    public function getParent()
    {
        return 'entity';
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'ad_country';
    }
}