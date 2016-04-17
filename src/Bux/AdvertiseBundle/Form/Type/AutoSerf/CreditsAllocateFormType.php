<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 3/4/15
 * Time: 5:43 PM
 */

namespace Bux\AdvertiseBundle\Form\Type\AutoSerf;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class CreditsAllocateFormType
 *
 * @package Bux\AdvertiseBundle\Form\Type\AutoSerf
 */
class CreditsAllocateFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('credits', 'text', array(
                'constraints' => array(
                    new NotBlank()
                )
            ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'credits_allocate_form_type';
    }
}