<?php
/**
 * Created by PhpStorm.
 * User: oparin
 * Date: 1/14/15
 * Time: 8:03 PM
 */

namespace Bux\AccountBundle\Form\Type\Ads;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class AdCountryFormType
 *
 * @package Bux\AccountBundle\Form\Type\Ads
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